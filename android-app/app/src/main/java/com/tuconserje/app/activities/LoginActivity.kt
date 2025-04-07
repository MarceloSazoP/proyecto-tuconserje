package com.tuconserje.app.activities

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.tuconserje.app.R
import com.tuconserje.app.TuConserjeApp
import com.tuconserje.app.models.LoginRequest
import kotlinx.coroutines.launch

/**
 * Actividad de inicio de sesión para la aplicación Android
 */
class LoginActivity : AppCompatActivity() {

    // Binding para acceder a las vistas
    private lateinit var binding: ActivityLoginBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Inflar el layout usando View Binding
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Configurar listeners
        setupListeners()
        
        // Verificar si ya hay una sesión activa
        checkExistingSession()
    }

    private fun setupListeners() {
        // Botón de inicio de sesión
        binding.btnLogin.setOnClickListener {
            val email = binding.etEmail.text.toString().trim()
            val password = binding.etPassword.text.toString().trim()
            
            // Validar campos
            if (validateFields(email, password)) {
                // Intentar login
                login(email, password)
            }
        }

        // Enlace para ir a la pantalla de registro
        binding.tvRegister.setOnClickListener {
            startActivity(Intent(this, RegisterActivity::class.java))
        }

        // Enlace para recuperar contraseña
        binding.tvForgotPassword.setOnClickListener {
            // Implementar recuperación de contraseña
            Toast.makeText(this, "Funcionalidad en desarrollo", Toast.LENGTH_SHORT).show()
        }
    }

    private fun validateFields(email: String, password: String): Boolean {
        var isValid = true

        // Validar email
        if (email.isEmpty()) {
            binding.tilEmail.error = "El email es obligatorio"
            isValid = false
        } else if (!android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            binding.tilEmail.error = "Email inválido"
            isValid = false
        } else {
            binding.tilEmail.error = null
        }

        // Validar contraseña
        if (password.isEmpty()) {
            binding.tilPassword.error = "La contraseña es obligatoria"
            isValid = false
        } else if (password.length < 6) {
            binding.tilPassword.error = "La contraseña debe tener al menos 6 caracteres"
            isValid = false
        } else {
            binding.tilPassword.error = null
        }

        return isValid
    }

    private fun login(email: String, password: String) {
        // Mostrar progreso
        binding.progressBar.visibility = View.VISIBLE
        binding.btnLogin.isEnabled = false

        // Realizar petición de login en un hilo secundario
        lifecycleScope.launch {
            try {
                val loginRequest = LoginRequest(email, password)
                val response = TuConserjeApp.instance.apiClient.apiService.login(loginRequest)
                
                // Guardar token
                TuConserjeApp.instance.saveAuthToken(response.token)
                
                // Ir a la pantalla principal
                startActivity(Intent(this@LoginActivity, MainActivity::class.java))
                finish() // Cerrar esta actividad para que no se pueda volver atrás
            } catch (e: Exception) {
                // Manejar error
                Toast.makeText(
                    this@LoginActivity,
                    "Error: ${e.message ?: "Credenciales inválidas"}",
                    Toast.LENGTH_LONG
                ).show()
            } finally {
                // Ocultar progreso
                binding.progressBar.visibility = View.GONE
                binding.btnLogin.isEnabled = true
            }
        }
    }

    private fun checkExistingSession() {
        // Verificar si ya hay un token guardado
        val token = TuConserjeApp.instance.getAuthToken()
        if (token != null) {
            // Verificar validez del token
            lifecycleScope.launch {
                try {
                    val response = TuConserjeApp.instance.apiClient.apiService.verifyToken(mapOf("token" to token))
                    if (response.valid) {
                        // Token válido, ir a la pantalla principal
                        startActivity(Intent(this@LoginActivity, MainActivity::class.java))
                        finish()
                    } else {
                        // Token inválido, eliminar
                        TuConserjeApp.instance.clearAuthToken()
                    }
                } catch (e: Exception) {
                    // Error al verificar token, eliminar
                    TuConserjeApp.instance.clearAuthToken()
                }
            }
        }
    }
}