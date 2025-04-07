# Aplicación Android Tu Conserje

Este directorio contiene el código fuente para la aplicación nativa de Android de Tu Conserje, desarrollada con Kotlin.

## Estructura del Proyecto

```
android-app/
├── app/                      # Módulo principal de la aplicación
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/tuconserje/app/  # Código fuente Kotlin
│   │   │   │   ├── activities/           # Actividades de la aplicación
│   │   │   │   ├── fragments/            # Fragmentos para las pantallas
│   │   │   │   ├── adapters/             # Adaptadores para RecyclerViews
│   │   │   │   ├── models/               # Modelos de datos
│   │   │   │   ├── network/              # Cliente API y servicios
│   │   │   │   ├── utils/                # Utilidades y helpers
│   │   │   │   └── viewmodels/           # ViewModels para MVVM
│   │   │   ├── res/                      # Recursos (layouts, strings, etc.)
│   │   │   └── AndroidManifest.xml       # Configuración de la aplicación
│   │   └── test/                         # Pruebas unitarias
│   ├── build.gradle                      # Configuración de dependencias
├── gradle/                               # Configuración de Gradle
└── build.gradle                          # Configuración del proyecto
```

## Requisitos

- Android Studio Arctic Fox (2021.3.1) o superior
- JDK 11 o superior
- Dispositivo o emulador con Android 6.0 (API 23) o superior

## Configuración del Entorno

1. Instalar Android Studio desde [developer.android.com](https://developer.android.com/studio)
2. Clonar este repositorio
3. Abrir el proyecto desde Android Studio seleccionando la carpeta `android-app`
4. Sincronizar el proyecto con Gradle

## Ejecución

1. Conectar un dispositivo Android o iniciar un emulador
2. Ejecutar la aplicación desde Android Studio (Shift + F10 o botón Run)

## Características Principales

- Autenticación de usuarios (login/registro)
- Gestión de solicitudes de conserjería
- Sistema de mensajería entre residentes y conserjes
- Notificaciones push para nuevos mensajes y actualizaciones
- Interfaz nativa siguiendo Material Design

## Arquitectura

La aplicación sigue el patrón de arquitectura MVVM (Model-View-ViewModel):

- **Model**: Clases de datos y repositorios que manejan la lógica de negocio
- **View**: Actividades y Fragmentos que muestran la interfaz de usuario
- **ViewModel**: Clases que mantienen el estado de la UI y manejan la lógica de presentación

Se utilizan los siguientes componentes de Android Architecture Components:

- LiveData para observar cambios en los datos
- ViewModel para gestionar datos relacionados con la UI
- Room para persistencia local (caché)
- Navigation Component para la navegación entre fragmentos

## Comunicación con el Backend

La aplicación se comunica con la API REST existente utilizando Retrofit como cliente HTTP. Las respuestas JSON se convierten automáticamente a objetos Kotlin utilizando Gson.

Los tokens JWT se almacenan de forma segura utilizando EncryptedSharedPreferences.