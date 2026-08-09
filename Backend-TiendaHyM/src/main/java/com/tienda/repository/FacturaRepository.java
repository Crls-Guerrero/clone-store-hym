package com.tienda.repository;

import com.tienda.model.Factura;
import org.springframework.data.jpa.repository.JpaRepository;   

public interface FacturaRepository extends JpaRepository<Factura, Integer> {    
}
