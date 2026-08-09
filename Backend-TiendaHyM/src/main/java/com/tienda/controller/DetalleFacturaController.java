package com.tienda.controller;

import com.tienda.model.DetalleFactura;
import com.tienda.repository.DetalleFacturaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class DetalleFacturaController {

    @Autowired
    private DetalleFacturaRepository detalleFacturaRepository;
    @GetMapping("/detalle-facturas")
    public List<DetalleFactura> getDetalleFacturas() {
        return detalleFacturaRepository.findAll();
    }

}
