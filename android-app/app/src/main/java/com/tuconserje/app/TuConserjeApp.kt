package com.tuconserje.app

import android.app.Application
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKeys
import com.tuconserje.app.network.ApiClient

class TuConserjeApp : Application() {

    companion object {
        lateinit var instance: TuConserjeApp
            private set
    }

    // Cliente API para comunicación con el backend
    lateinit var apiClient: ApiClient
        private set

    // Preferencias encriptadas para almacenar información sensible
    lateinit var securePreferences: EncryptedSharedPreferences
        private set

    override fun onCreate() {
        super.onCreate()
        instance = this
        
        // Inicializar preferencias encriptadas
        val masterKeyAlias = MasterKeys.getOrCreate(MasterKeys.AES256_GCM_SPEC)
        securePreferences = EncryptedSharedPreferences.create(
            "secure_prefs",
            masterKeyAlias,
            applicationContext,
            EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
            EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
        ) as EncryptedSharedPreferences

        // Inicializar cliente API
        apiClient = ApiClient(BuildConfig.API_BASE_URL)
    }

    // Método para guardar el token JWT de forma segura
    fun saveAuthToken(token: String) {
        securePreferences.edit().putString("auth_token", token).apply()
    }

    // Método para obtener el token JWT
    fun getAuthToken(): String? {
        return securePreferences.getString("auth_token", null)
    }

    // Método para eliminar el token (logout)
    fun clearAuthToken() {
        securePreferences.edit().remove("auth_token").apply()
    }
}