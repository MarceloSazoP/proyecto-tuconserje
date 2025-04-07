package com.tuconserje.app.activities

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.NavigationUI
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.tuconserje.app.R
import com.tuconserje.app.databinding.ActivityMainBinding

/**
 * Actividad principal que contiene la navegación entre fragmentos
 */
class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Inflar el layout usando View Binding
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Configurar la navegación inferior
        setupNavigation()
    }

    private fun setupNavigation() {
        val navView: BottomNavigationView = binding.navView
        val navController = findNavController(R.id.nav_host_fragment)
        
        // Configurar los destinos de nivel superior
        val appBarConfiguration = AppBarConfiguration(setOf(
            R.id.navigation_home, 
            R.id.navigation_requests, 
            R.id.navigation_messages, 
            R.id.navigation_profile
        ))
        
        // Configurar la barra de acción con el controlador de navegación
        NavigationUI.setupActionBarWithNavController(this, navController, appBarConfiguration)
        
        // Configurar el menú de navegación inferior con el controlador de navegación
        NavigationUI.setupWithNavController(navView, navController)
    }
}