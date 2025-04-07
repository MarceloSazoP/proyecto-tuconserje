package com.tuconserje.app.models

import com.google.gson.annotations.SerializedName

/**
 * Modelos de datos para la aplicación Android
 */

// Modelo para la solicitud de login
data class LoginRequest(
    val email: String,
    val password: String
)

// Modelo para la respuesta de login
data class LoginResponse(
    val token: String,
    val usuario: Usuario
)

// Modelo para la respuesta de verificación de token
data class VerifyTokenResponse(
    val valid: Boolean,
    val usuario: Usuario? = null,
    val error: String? = null
)

// Modelo de usuario
data class Usuario(
    val id: String,
    val email: String,
    val name: String,
    val role: String
)

// Enumeración para los roles de usuario
enum class UserRole {
    RESIDENT,
    CONCIERGE,
    ADMIN
}

// Modelo para mensajes
data class Mensaje(
    val id: String,
    val content: String,
    val senderId: String,
    val receiverId: String,
    val read: Boolean,
    @SerializedName("createdAt") val fechaCreacion: String,
    @SerializedName("updatedAt") val fechaActualizacion: String,
    val sender: Usuario? = null,
    val receiver: Usuario? = null
)

// Enumeración para estados de solicitudes
enum class RequestStatus {
    PENDING,
    IN_PROGRESS,
    COMPLETED,
    CANCELLED
}

// Modelo para solicitudes
data class Solicitud(
    val id: String,
    val title: String,
    val description: String,
    val status: String,
    val userId: String,
    val assignedTo: String?,
    @SerializedName("createdAt") val fechaCreacion: String,
    @SerializedName("updatedAt") val fechaActualizacion: String,
    val user: Usuario? = null,
    val concierge: Usuario? = null
)