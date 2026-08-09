package com.tienda.controller;

import com.tienda.model.Factura;
import com.tienda.repository.FacturaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class FacturaController {
    
    @Autowired
    private FacturaRepository facturaRepository;

    @GetMapping("/facturas")
    public List<Factura> getFacturas() {
        return facturaRepository.findAll();
    }

}
