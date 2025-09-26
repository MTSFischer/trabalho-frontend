import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { formatCurrency } from '../utils/formatCurrency';

const PRODUCT_ENDPOINT = 'https://fakestoreapi.com/products';

export default function ProductDetailsScreen({ route }) {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`${PRODUCT_ENDPOINT}/${productId}`);
      setProduct(response.data);
    } catch (_error) {
      setError('Não foi possível carregar os detalhes do produto.');
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.retryButton} onPress={fetchProduct}>
          <Text style={styles.retryText}>Tentar novamente</Text>
        </Pressable>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Produto não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
      <View style={styles.section}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.price}>{formatCurrency(product.price)}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 24,
    backgroundColor: '#ffffff',
  },
  centered: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 12,
  },
  image: {
    width: '100%',
    height: 260,
  },
  section: {
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  category: {
    fontSize: 16,
    color: '#2563eb',
    textTransform: 'capitalize',
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#047857',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#374151',
  },
  errorText: {
    color: '#b91c1c',
    fontSize: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
