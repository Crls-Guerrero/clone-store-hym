package com.tienda.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;
import java.util.Date;

@Entity
public class Factura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idFactura;

    // Relación con la tabla Cliente
    @ManyToOne
    @JoinColumn(name = "id_cliente")
    private Cliente cliente; 

    private Date fecha;
    private Double total;

    // Constructor por defecto
    public Factura() {
    }

    // Constructor con parámetros
    public Factura(Cliente cliente, Date fecha, Double total) {
        this.cliente = cliente;
        this.fecha = fecha;
        this.total = total;
    }

    // Getters y Setters
    public Integer getIdFactura() {
        return idFactura;
    }

    public void setIdFactura(Integer idFactura) {
        this.idFactura = idFactura;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }
}
