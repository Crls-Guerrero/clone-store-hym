package com.tienda.controller;

import com.tienda.model.Cliente;
import com.tienda.repository.ClienteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    // Listar todos los clientes
    @GetMapping
    public List<Cliente> getAll() {
        return clienteRepository.findAll();
    }

    // Obtener un cliente por ID
    @GetMapping("/{id}")
    public Cliente getById(@PathVariable Integer id) {
        return clienteRepository.findById(id).orElse(null);
    }
}