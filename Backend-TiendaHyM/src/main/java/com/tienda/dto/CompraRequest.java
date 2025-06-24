package com.tienda.dto;

import java.util.List;

public class CompraRequest {
    private Integer idCliente;
    private Double total;
    private List<DetalleDTO> productos;

    // Getters y setters
    public Integer getIdCliente() {
        return idCliente;
    }
    public void setIdCliente(Integer idCliente) {
        this.idCliente = idCliente;
    }
    public Double getTotal() {
        return total;
    }
    public void setTotal(Double total) {
        this.total = total;
    }
    public List<DetalleDTO> getProductos() {
        return productos;
    }
    public void setProductos(List<DetalleDTO> productos) {
        this.productos = productos;
    }

    // Clase interna para los detalles de la compra
    public static class DetalleDTO {
        private Integer idProducto;
        private Integer cantidad;
        private Double precioUnitario;

        // Getters y setters
        public Integer getIdProducto() {
            return idProducto;
        }
        public void setIdProducto(Integer idProducto) {
            this.idProducto = idProducto;
        }
        public Integer getCantidad() {
            return cantidad;
        }
        public void setCantidad(Integer cantidad) {
            this.cantidad = cantidad;
        }
        public Double getPrecioUnitario() {
            return precioUnitario;
        }
        public void setPrecioUnitario(Double precioUnitario) {
            this.precioUnitario = precioUnitario;
        }
    }
}