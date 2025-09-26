import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from 'axios';
import { formatCurrency } from '../utils/formatCurrency';

const PRODUCTS_ENDPOINT = 'https://fakestoreapi.com/products';
const CATEGORIES_ENDPOINT = 'https://fakestoreapi.com/products/categories';

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const fetchProducts = useCallback(async (category, { skipSpinner = false } = {}) => {
    try {
      if (!skipSpinner) {
        setLoading(true);
      }
      setError('');
      const url = category
        ? `${PRODUCTS_ENDPOINT}/category/${encodeURIComponent(category)}`
        : PRODUCTS_ENDPOINT;
      const response = await axios.get(url);
      setProducts(response.data || []);
    } catch (_error) {
      setError('Não foi possível carregar os produtos. Tente novamente.');
    } finally {
      if (!skipSpinner) {
        setLoading(false);
      }
      setRefreshing(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get(CATEGORIES_ENDPOINT);
      setCategories(response.data || []);
    } catch (_error) {
      setCategories(['electronics', "jewelery", "men's clothing", "women's clothing"]);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchProducts(null);
  }, [fetchCategories, fetchProducts]);

  const handleSelectCategory = (category) => {
    const newCategory = category === selectedCategory ? null : category;
    setSelectedCategory(newCategory);
    fetchProducts(newCategory);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchProducts(selectedCategory, { skipSpinner: true });
  };

  const renderProduct = ({ item }) => (
    <Pressable
      onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.cardPrice}>{formatCurrency(item.price)}</Text>
      </View>
    </Pressable>
  );

  const renderEmpty = () => {
    if (loading) {
      return null;
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhum produto encontrado.</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.filtersContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={[null, ...categories]}
            keyExtractor={(item) => (item ? item : 'all')}
            renderItem={({ item }) => {
              const isActive = selectedCategory === item || (item === null && !selectedCategory);
              return (
                <Pressable
                  onPress={() => handleSelectCategory(item)}
                  style={({ pressed }) => [
                    styles.filterChip,
                    isActive && styles.filterChipActive,
                    pressed && styles.filterChipPressed,
                  ]}
                >
                  <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                    {item ? item : 'Todas'}
                  </Text>
                </Pressable>
              );
            }}
            contentContainerStyle={styles.filtersContent}
          />
        </View>

        {error ? (
          <Pressable style={styles.errorContainer} onPress={() => fetchProducts(selectedCategory)}>
            <Text style={styles.errorText}>{error}</Text>
            <Text style={styles.errorAction}>Toque para tentar novamente</Text>
          </Pressable>
        ) : null}

        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderProduct}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmpty}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        />

        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#2563eb" />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  filtersContainer: {
    paddingVertical: 12,
  },
  filtersContent: {
    paddingRight: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  filterChipPressed: {
    opacity: 0.7,
  },
  filterText: {
    color: '#1f2937',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardPressed: {
    opacity: 0.7,
  },
  image: {
    width: 72,
    height: 72,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
    gap: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2563eb',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    color: '#6b7280',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(243, 244, 246, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    backgroundColor: '#fee2e2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  errorText: {
    color: '#b91c1c',
    fontWeight: '600',
  },
  errorAction: {
    marginTop: 4,
    color: '#7f1d1d',
    fontSize: 12,
  },
});
