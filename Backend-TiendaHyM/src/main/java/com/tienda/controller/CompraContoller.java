package com.tienda.controller;

import com.tienda.dto.CompraRequest;
import com.tienda.model.Factura;
import com.tienda.model.DetalleFactura;
import com.tienda.model.Producto;
import com.tienda.model.Cliente;
import com.tienda.repository.FacturaRepository;
import com.tienda.repository.DetalleFacturaRepository;
import com.tienda.repository.ProductoRepository;
import com.tienda.repository.ClienteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/compra")
public class CompraContoller {

    @Autowired
    private FacturaRepository facturaRepository;
    @Autowired
    private DetalleFacturaRepository detalleFacturaRepository;
    @Autowired
    private ProductoRepository productoRepository;
    @Autowired
    private ClienteRepository clienteRepository;

    @PostMapping("/realizar")
    public String realizarCompra(@RequestBody CompraRequest compra) {
        // 1. Buscar cliente
        Cliente cliente = clienteRepository.findById(compra.getIdCliente()).orElse(null);
        if (cliente == null) return "{\"ok\":false, \"msg\":\"Cliente no encontrado\"}";

        // 2. Guardar factura
        Factura factura = new Factura();
    factura.setCliente(cliente);
    factura.setTotal(compra.getTotal());
    factura.setFecha(new java.util.Date()); 
    factura = facturaRepository.save(factura);


        // 3. Guardar detalles
        for (CompraRequest.DetalleDTO p : compra.getProductos()) {
            Producto producto = productoRepository.findById(p.getIdProducto()).orElse(null);
            if (producto == null) continue;
            DetalleFactura detalle = new DetalleFactura();
            detalle.setFactura(factura);
            detalle.setProducto(producto);
            detalle.setCantidad(p.getCantidad());
            detalle.setPrecioUnitario(p.getPrecioUnitario());
            detalle.setSubtotal(p.getCantidad() * p.getPrecioUnitario());
            detalleFacturaRepository.save(detalle);
        }

        return "{\"ok\":true, \"id_factura\":" + factura.getIdFactura() + "}";
    }
}