/**
 * Cliente de autenticación para la aplicación móvil
 * Proporciona funciones para manejar el login, verificación de token y almacenamiento seguro
 */

import { User } from '@prisma/client';

// Interfaces para tipado
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  usuario: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export interface AuthError {
  error: string;
  status?: number;
}

// URL base para las peticiones API
const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

/**
 * Realiza la autenticación del usuario con email y contraseña
 */
export async function login(credentials: LoginCredentials): Promise<LoginResponse | AuthError> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.error || 'Error de autenticación', status: response.status };
    }

    return data as LoginResponse;
  } catch (error) {
    console.error('Error en login:', error);
    return { error: 'Error de conexión con el servidor' };
  }
}

/**
 * Verifica si un token JWT es válido
 */
export async function verifyToken(token: string): Promise<{ valid: boolean; usuario?: User }> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { valid: false };
    }

    return data;
  } catch (error) {
    console.error('Error al verificar token:', error);
    return { valid: false };
  }
}

/**
 * Guarda el token JWT en el almacenamiento seguro del dispositivo móvil
 * Nota: Esta es una implementación simulada. En una app real, se usaría
 * almacenamiento seguro específico de la plataforma (iOS/Android)
 */
export function saveAuthToken(token: string): void {
  // En una app móvil real, aquí se usaría almacenamiento seguro nativo
  // Por ejemplo: AsyncStorage, SecureStore, o KeyChain/Keystore
  localStorage.setItem('auth_token', token);
}

/**
 * Recupera el token JWT del almacenamiento seguro
 */
export function getAuthToken(): string | null {
  // En una app móvil real, aquí se recuperaría del almacenamiento seguro nativo
  return localStorage.getItem('auth_token');
}

/**
 * Elimina el token JWT del almacenamiento seguro (logout)
 */
export function removeAuthToken(): void {
  // En una app móvil real, aquí se eliminaría del almacenamiento seguro nativo
  localStorage.removeItem('auth_token');
}