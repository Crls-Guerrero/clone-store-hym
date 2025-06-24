package com.tienda.repository;

import com.tienda.model.DetalleFactura;
import com.tienda.model.Factura;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DetalleFacturaRepository extends JpaRepository<DetalleFactura, Integer> {
    List<DetalleFactura> findByFactura(Factura factura);
}