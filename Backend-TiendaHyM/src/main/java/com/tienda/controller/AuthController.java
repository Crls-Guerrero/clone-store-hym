package com.tienda.controller;

import com.tienda.model.Cliente;
import com.tienda.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private ClienteRepository clienteRepository;

    // Registro
    @PostMapping("/register")
    public Cliente register(@RequestBody Cliente cliente) {
        
        return clienteRepository.save(cliente);
    }

    // Login    
    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody Cliente loginData) {
    Optional<Cliente> clienteOpt = clienteRepository.findByEmail(loginData.getEmail());
    if (clienteOpt.isPresent()) {
        Cliente cliente = clienteOpt.get();
        if (cliente.getPasswordHash().equals(loginData.getPasswordHash())) {
            cliente.setPasswordHash(null);
            return ResponseEntity.ok(cliente);
        }
    }
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
}
}