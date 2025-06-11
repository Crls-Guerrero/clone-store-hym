package com.tienda.controller;

import com.tienda.model.Genero;
import com.tienda.repository.GeneroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/generos")
public class GeneroController {

    @Autowired
    private GeneroRepository generoRepository;

    @GetMapping
    public List<Genero> getAll() {
        return generoRepository.findAll();
    }

    @PostMapping
    public Genero create(@RequestBody Genero genero) {
        return generoRepository.save(genero);
    }
}