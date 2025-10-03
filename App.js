import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Alert, Platform, TouchableOpacity, Text } from 'react-native';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import GroupInfoScreen from './src/screens/GroupInfoScreen';

const Stack = createNativeStackNavigator();

// Botão de header minimalista e confiável
function HeaderBtn({ label, onPress, color }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      style={{ paddingHorizontal: 12, paddingVertical: 8 }}
    >
      <Text style={{ color, fontWeight: '600' }}>{label}</Text>
    </TouchableOpacity>
  );
}

// Confirmação cross-platform (usa Alert no mobile e window.confirm no Web)
async function confirmDialog(title, message) {
  if (Platform.OS === 'web') {
    // evita casos em que Alert não exibe no Web
    return window.confirm(`${title}\n\n${message}`);
  }
  return new Promise((resolve) => {
    Alert.alert(
      title,
      message,
      [
        { text: 'Cancelar', style: 'cancel', onPress: () => resolve(false) },
        { text: 'Sair', style: 'destructive', onPress: () => resolve(true) },
      ],
      { cancelable: true }
    );
  });
}

export default function App() {
  const [session, setSession] = useState(null);

  const handleLogin = (data) => setSession(data);

  const handleLogout = async () => {
    console.log('[Logout] botão clicado');
    const ok = await confirmDialog('Sair da conta', 'Deseja realmente sair?');
    if (ok) {
      console.log('[Logout] confirmado — limpando sessão');
      setSession(null);
    }
  };

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator>
        {!session ? (
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              options={({ navigation }) => ({
                title: 'Produtos',
                headerTitleAlign: 'center',
                // usa nosso botão confiável (sem componente externo)
                headerLeft: () => (
                  <HeaderBtn label="Logout" onPress={handleLogout} color="#b91c1c" />
                ),
                headerRight: () => (
                  <HeaderBtn
                    label="Info"
                    onPress={() => navigation.navigate('GroupInfo')}
                    color="#2563eb"
                  />
                ),
              })}
            >
              {(props) => <HomeScreen {...props} />}
            </Stack.Screen>

            <Stack.Screen
              name="ProductDetails"
              component={ProductDetailsScreen}
              options={{ title: 'Detalhes do Produto' }}
            />
            <Stack.Screen
              name="GroupInfo"
              component={GroupInfoScreen}
              options={{ title: 'Informações do Grupo' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
