# Aplicación iOS Tu Conserje

Este directorio contiene el código fuente para la aplicación nativa de iOS de Tu Conserje, desarrollada con Swift.

## Estructura del Proyecto

```
ios-app/
├── TuConserje/
│   ├── AppDelegate.swift           # Delegado de la aplicación
│   ├── SceneDelegate.swift         # Delegado de escena (iOS 13+)
│   ├── Models/                     # Modelos de datos
│   ├── Views/                      # Vistas y controladores
│   │   ├── Authentication/         # Pantallas de autenticación
│   │   ├── Main/                   # Pantallas principales
│   │   ├── Requests/               # Pantallas de solicitudes
│   │   └── Messages/               # Pantallas de mensajes
│   ├── ViewModels/                 # ViewModels para MVVM
│   ├── Services/                   # Servicios (API, almacenamiento, etc.)
│   ├── Utils/                      # Utilidades y extensiones
│   ├── Resources/                  # Recursos (imágenes, fuentes, etc.)
│   └── Storyboards/                # Archivos de interfaz
├── TuConserjeTests/                # Pruebas unitarias
└── TuConserjeUITests/              # Pruebas de interfaz
```

## Requisitos

- Xcode 14.0 o superior
- iOS 15.0 o superior como target de despliegue
- Swift 5.7 o superior
- CocoaPods para gestión de dependencias

## Configuración del Entorno

1. Instalar Xcode desde la Mac App Store
2. Instalar CocoaPods:
   ```bash
   sudo gem install cocoapods
   ```
3. Clonar este repositorio
4. Navegar al directorio `ios-app`
5. Instalar dependencias:
   ```bash
   pod install
   ```
6. Abrir el archivo `TuConserje.xcworkspace` con Xcode

## Ejecución

1. Seleccionar un simulador o dispositivo iOS
2. Presionar el botón de Play en Xcode o usar el atajo ⌘+R

## Características Principales

- Autenticación de usuarios (login/registro)
- Gestión de solicitudes de conserjería
- Sistema de mensajería entre residentes y conserjes
- Notificaciones push para nuevos mensajes y actualizaciones
- Interfaz nativa siguiendo Human Interface Guidelines

## Arquitectura

La aplicación sigue el patrón de arquitectura MVVM (Model-View-ViewModel):

- **Model**: Clases de datos y servicios que manejan la lógica de negocio
- **View**: ViewControllers y vistas que muestran la interfaz de usuario
- **ViewModel**: Clases que mantienen el estado de la UI y manejan la lógica de presentación

## Comunicación con el Backend

La aplicación se comunica con la API REST existente utilizando Alamofire como cliente HTTP. Las respuestas JSON se convierten automáticamente a objetos Swift utilizando Codable.

Los tokens JWT se almacenan de forma segura utilizando Keychain.