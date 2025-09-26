import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Alert } from 'react-native';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import GroupInfoScreen from './src/screens/GroupInfoScreen';
import HeaderButton from './src/components/HeaderButton';

const Stack = createNativeStackNavigator();

export default function App() {
  const [session, setSession] = useState(null);

  const handleLogin = (data) => {
    setSession(data);
  };

  const handleLogout = () => {
    Alert.alert('Sair da conta', 'Deseja realmente sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: () => setSession(null),
      },
    ]);
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
                headerLeft: () => <HeaderButton label="Logout" onPress={handleLogout} color="#b91c1c" />,
                headerRight: () => (
                  <HeaderButton
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
