package com.tuconserje.app.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.tuconserje.app.R
import com.tuconserje.app.databinding.FragmentHomeBinding

/**
 * Fragmento de inicio que muestra la pantalla principal de la aplicación
 */
class HomeFragment : Fragment() {

    private var _binding: FragmentHomeBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        
        // Configurar la vista del fragmento de inicio
        setupView()
    }

    private fun setupView() {
        // Aquí se configura la vista del fragmento de inicio
        // Por ejemplo, cargar datos del usuario, mostrar notificaciones, etc.
        binding.tvWelcome.text = "Bienvenido a Tu Conserje"
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}