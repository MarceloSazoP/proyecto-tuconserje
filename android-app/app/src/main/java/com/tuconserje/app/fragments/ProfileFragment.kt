package com.tuconserje.app.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.tuconserje.app.R
import com.tuconserje.app.databinding.FragmentProfileBinding

/**
 * Fragmento que muestra el perfil del usuario
 */
class ProfileFragment : Fragment() {

    private var _binding: FragmentProfileBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentProfileBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        
        // Configurar la vista del fragmento de perfil
        setupView()
    }

    private fun setupView() {
        // Aquí se configura la vista del fragmento de perfil
        // Por ejemplo, cargar los datos del perfil del usuario
        binding.tvProfileName.text = "Nombre de Usuario"
        binding.tvProfileEmail.text = "usuario@ejemplo.com"
        
        // Configurar botones de acción del perfil
        binding.btnEditProfile.setOnClickListener {
            // Implementar edición de perfil
        }
        
        binding.btnLogout.setOnClickListener {
            // Implementar cierre de sesión
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}