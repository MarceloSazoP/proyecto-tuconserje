# Aplicación Móvil Tu Conserje

Este directorio contiene el código fuente para la aplicación móvil de Tu Conserje, desarrollada con React Native y Expo.

## Estructura del Proyecto

```
src/mobile/
├── App.tsx                # Punto de entrada principal de la aplicación
├── navigation/            # Configuración de navegación
│   └── AppNavigator.tsx   # Navegador principal de la aplicación
└── screens/               # Pantallas de la aplicación
    └── LoginScreen.tsx    # Pantalla de inicio de sesión
```

## Configuración

Para configurar el entorno de desarrollo para la aplicación móvil:

1. Instala las dependencias necesarias:

```bash
npm install --save $(cat mobile-dependencies.json | jq -r '.dependencies | to_entries | map("\(.key)@\(.value)") | join(" ')")
```

2. Asegúrate de tener Expo CLI instalado globalmente:

```bash
npm install -g expo-cli
```

## Ejecución

Para ejecutar la aplicación en modo desarrollo:

```bash
expo start
```

Luego, puedes ejecutar la aplicación en:

- Dispositivo iOS: `expo run:ios`
- Dispositivo Android: `expo run:android`
- Emulador: Escanea el código QR con la aplicación Expo Go en tu dispositivo

## Autenticación

La aplicación utiliza autenticación basada en JWT. El flujo de autenticación es el siguiente:

1. El usuario ingresa sus credenciales en la pantalla de login
2. La aplicación envía las credenciales al servidor a través del endpoint `/api/auth/login`
3. Si las credenciales son válidas, el servidor devuelve un token JWT
4. La aplicación almacena el token y lo utiliza para autenticar las solicitudes posteriores

## Endpoints de API

- **POST /api/auth/login**: Autentica al usuario y devuelve un token JWT
- **POST /api/auth/verify**: Verifica si un token JWT es válido

## Notas de Implementación

- La aplicación está diseñada para funcionar tanto en iOS como en Android
- Se utiliza React Navigation para la navegación entre pantallas
- La autenticación se maneja a través de JWT almacenados de forma segura
- La interfaz de usuario está optimizada para dispositivos móviles con un diseño moderno y responsivo