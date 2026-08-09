package com.tienda.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
public class Talla {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idTalla;

    private String talla;

    // Constructor por defecto
    public Talla() {
    }

    // Constructor con parámetros
    public Talla(String talla) {
        this.talla = talla;
    }

    // Getters y Setters
    public Integer getIdTalla() {
        return idTalla;
    }

    public void setIdTalla(Integer idTalla) {
        this.idTalla = idTalla;
    }

    public String getTalla() {
        return talla;
    }

    public void setTalla(String talla) {
        this.talla = talla;
    }
}
