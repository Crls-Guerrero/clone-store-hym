package com.tienda.controller;

import com.tienda.model.Talla;
import com.tienda.repository.TallaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class TallaController {
    
    @Autowired
    private TallaRepository tallaRepository;

    @GetMapping("/tallas")
    public List<Talla> getTallas() {
        return tallaRepository.findAll();
    }

}
