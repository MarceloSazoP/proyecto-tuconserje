package com.tuconserje.app.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.tuconserje.app.R
import com.tuconserje.app.databinding.FragmentRequestsBinding

/**
 * Fragmento que muestra las solicitudes del usuario
 */
class RequestsFragment : Fragment() {

    private var _binding: FragmentRequestsBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentRequestsBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        
        // Configurar la vista del fragmento de solicitudes
        setupView()
    }

    private fun setupView() {
        // Aquí se configura la vista del fragmento de solicitudes
        // Por ejemplo, cargar la lista de solicitudes del usuario
        binding.tvRequestsTitle.text = "Mis Solicitudes"
        
        // Configurar el RecyclerView para mostrar las solicitudes
        // binding.rvRequests.adapter = RequestsAdapter()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}