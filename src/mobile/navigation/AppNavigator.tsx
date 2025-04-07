import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Pantallas
import LoginScreen from '../screens/LoginScreen';

// Pantallas simuladas para completar la navegación
const HomeScreen = () => <View style={styles.center}><Text>Pantalla Principal</Text></View>;
const ProfileScreen = () => <View style={styles.center}><Text>Perfil de Usuario</Text></View>;
const RequestsScreen = () => <View style={styles.center}><Text>Solicitudes</Text></View>;
const MessagesScreen = () => <View style={styles.center}><Text>Mensajes</Text></View>;
const ForgotPasswordScreen = () => <View style={styles.center}><Text>Recuperar Contraseña</Text></View>;

// Importaciones de autenticación
import { getAuthToken, verifyToken } from '../../lib/authClient';
import { Text } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Navegador de pestañas para la aplicación principal
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Requests') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Messages') {
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4a90e2',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
      <Tab.Screen name="Requests" component={RequestsScreen} options={{ title: 'Solicitudes' }} />
      <Tab.Screen name="Messages" component={MessagesScreen} options={{ title: 'Mensajes' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar si el usuario está autenticado al cargar la aplicación
    const checkAuth = async () => {
      try {
        const token = getAuthToken();
        
        if (token) {
          // Verificar si el token es válido
          const { valid } = await verifyToken(token);
          setIsAuthenticated(valid);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4a90e2" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          // Rutas para usuarios autenticados
          <Stack.Screen name="Main" component={MainTabNavigator} />
        ) : (
          // Rutas para usuarios no autenticados
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen 
              name="ForgotPassword" 
              component={ForgotPasswordScreen} 
              options={{ 
                headerShown: true,
                title: 'Recuperar Contraseña',
                headerTintColor: '#4a90e2'
              }} 
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});