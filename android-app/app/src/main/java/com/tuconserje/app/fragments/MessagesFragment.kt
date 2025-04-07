package com.tuconserje.app.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.tuconserje.app.R
import com.tuconserje.app.databinding.FragmentMessagesBinding

/**
 * Fragmento que muestra los mensajes del usuario
 */
class MessagesFragment : Fragment() {

    private var _binding: FragmentMessagesBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentMessagesBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        
        // Configurar la vista del fragmento de mensajes
        setupView()
    }

    private fun setupView() {
        // Aquí se configura la vista del fragmento de mensajes
        // Por ejemplo, cargar la lista de mensajes del usuario
        binding.tvMessagesTitle.text = "Mis Mensajes"
        
        // Configurar el RecyclerView para mostrar los mensajes
        // binding.rvMessages.adapter = MessagesAdapter()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}