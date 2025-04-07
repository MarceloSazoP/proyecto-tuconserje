package com.tuconserje.app.network

import com.tuconserje.app.TuConserjeApp
import com.tuconserje.app.models.LoginRequest
import com.tuconserje.app.models.LoginResponse
import com.tuconserje.app.models.VerifyTokenResponse
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import java.util.concurrent.TimeUnit

/**
 * Cliente API para comunicación con el backend
 */
class ApiClient(private val baseUrl: String) {

    // Interfaz que define los endpoints de la API
    interface ApiService {
        @POST("api/auth/login")
        suspend fun login(@Body request: LoginRequest): LoginResponse

        @POST("api/auth/verify")
        suspend fun verifyToken(@Body request: Map<String, String>): VerifyTokenResponse

        // Aquí se añadirán más endpoints según se necesiten
    }

    // Interceptor para añadir el token de autenticación a las peticiones
    private val authInterceptor = Interceptor { chain ->
        val originalRequest = chain.request()
        val token = TuConserjeApp.instance.getAuthToken()

        val request = if (token != null) {
            originalRequest.newBuilder()
                .header("Authorization", "Bearer $token")
                .build()
        } else {
            originalRequest
        }

        chain.proceed(request)
    }

    // Interceptor para logging de peticiones y respuestas (solo en debug)
    private val loggingInterceptor = HttpLoggingInterceptor().apply {
        level = HttpLoggingInterceptor.Level.BODY
    }

    // Cliente HTTP con interceptores
    private val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(authInterceptor)
        .addInterceptor(loggingInterceptor)
        .connectTimeout(30, TimeUnit.SECONDS)
        .readTimeout(30, TimeUnit.SECONDS)
        .writeTimeout(30, TimeUnit.SECONDS)
        .build()

    // Cliente Retrofit
    private val retrofit = Retrofit.Builder()
        .baseUrl(baseUrl)
        .client(okHttpClient)
        .addConverterFactory(GsonConverterFactory.create())
        .build()

    // Servicio API
    val apiService: ApiService = retrofit.create(ApiService::class.java)
}