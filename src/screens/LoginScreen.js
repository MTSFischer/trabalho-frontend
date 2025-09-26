import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import axios from 'axios';

const USERS_ENDPOINT = 'https://fakestoreapi.com/users';
const LOGIN_ENDPOINT = 'https://fakestoreapi.com/auth/login';

export default function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoadingUsers(true);
        const response = await axios.get(USERS_ENDPOINT);
        setUsers(response.data || []);
      } catch (_error) {
        Alert.alert('Erro', 'Não foi possível carregar os usuários. Verifique sua conexão e tente novamente.');
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Campos obrigatórios', 'Informe usuário e senha.');
      return;
    }

    const matchedUser = users.find((user) => user.username.toLowerCase() === username.trim().toLowerCase());

    if (!matchedUser) {
      Alert.alert('Usuário não encontrado', 'Verifique o usuário digitado ou consulte a lista disponível no README.');
      return;
    }

    try {
      setSubmitting(true);
      const response = await axios.post(LOGIN_ENDPOINT, {
        username: matchedUser.username,
        password: password.trim(),
      });

      if (response.data?.token) {
        onLogin({ token: response.data.token, user: matchedUser });
      } else {
        Alert.alert('Falha no login', 'Não foi possível autenticar. Tente novamente.');
      }
    } catch (_error) {
      Alert.alert('Credenciais inválidas', 'Usuário ou senha incorretos.');
    } finally {
      setSubmitting(false);
    }
  };

  const isBusy = loadingUsers || submitting;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardContainer}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Bem-vindo!</Text>
          <Text style={styles.subtitle}>Faça login com um usuário válido da Fake Store API.</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="Digite o usuário"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              editable={!isBusy}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Digite a senha"
              secureTextEntry
              autoCapitalize="none"
              style={styles.input}
              editable={!isBusy}
            />
          </View>

          <Pressable
            onPress={handleSubmit}
            disabled={isBusy}
            style={({ pressed }) => [
              styles.buttonContainer,
              pressed && styles.buttonPressed,
              isBusy && styles.buttonDisabled,
            ]}
          >
            <Text style={styles.buttonLabel}>{submitting ? 'Entrando...' : 'Entrar'}</Text>
          </Pressable>

          {loadingUsers && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#2563eb" />
              <Text style={styles.loadingText}>Carregando usuários autorizados...</Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  keyboardContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#4b5563',
  },
  formGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 8,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 12,
  },
  buttonLabel: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  buttonPressed: {
    opacity: 0.6,
  },
  buttonDisabled: {
    backgroundColor: '#93c5fd',
  },
  loadingContainer: {
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    color: '#4b5563',
  },
});
