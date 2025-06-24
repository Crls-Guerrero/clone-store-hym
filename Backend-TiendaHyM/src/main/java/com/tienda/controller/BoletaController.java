package com.tienda.controller;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.tienda.model.Cliente;
import com.tienda.model.Factura;
import com.tienda.model.DetalleFactura;
import com.tienda.repository.FacturaRepository;
import com.tienda.repository.DetalleFacturaRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BoletaController {

    @Autowired
    private FacturaRepository facturaRepository;

    @Autowired
    private DetalleFacturaRepository detalleFacturaRepository;

    @GetMapping("/boleta/{idFactura}")
    public void descargarBoleta(@PathVariable Integer idFactura, HttpServletResponse response) throws Exception {
        Factura factura = facturaRepository.findById(idFactura).orElseThrow();
        Cliente cliente = factura.getCliente();
        List<DetalleFactura> detalles = detalleFacturaRepository.findByFactura(factura);

        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "attachment; filename=HyM_boleta_" + idFactura + ".pdf");

        Document document = new Document();
        PdfWriter.getInstance(document, response.getOutputStream());
        document.open();

        // --- LOGO ---
        try {
            Image logo = Image.getInstance("src/main/resources/static/img/logo.png");
            logo.scaleToFit(100, 100);
            logo.setAlignment(Image.ALIGN_CENTER);
            document.add(logo);
        } catch (Exception e) {}

        // --- ESPACIO ---
        document.add(new Paragraph(" "));

        // --- TÍTULO ---
        Paragraph titulo = new Paragraph("Tienda HyM\nBoleta de Venta N° " + factura.getIdFactura(),
                FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18));
        titulo.setAlignment(Element.ALIGN_CENTER);
        document.add(titulo);

        // --- ESPACIO ---
        document.add(new Paragraph(" "));
        document.add(new Paragraph(" "));
        document.add(new Paragraph(" "));

        // --- DATOS DEL CLIENTE CENTRADOS ---
        PdfPTable datosTable = new PdfPTable(1);
        datosTable.setWidthPercentage(60);
        datosTable.setHorizontalAlignment(Element.ALIGN_CENTER);

        Font fontDatos = FontFactory.getFont(FontFactory.HELVETICA, 12);
        String datos =
                "Cliente: " + cliente.getNombre() + " " + cliente.getApellido() + "\n" + "\n" +
                "Email: " + cliente.getEmail() + "\n" + "\n" +
                "Teléfono: " + cliente.getTelefono() + "\n" + "\n" +
                "Fecha: " + factura.getFecha();
        PdfPCell datosCell = new PdfPCell(new Phrase(datos, fontDatos));
        datosCell.setBorder(Rectangle.NO_BORDER);
        datosCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        datosCell.setPadding(8);
        datosTable.addCell(datosCell);
        document.add(datosTable);

        // --- MÁS ESPACIO ---
        document.add(new Paragraph(" "));
        document.add(new Paragraph(" "));

        // --- TABLA DE PRODUCTOS (minimalista, solo líneas entre filas) ---
        PdfPTable table = new PdfPTable(4);
        table.setWidthPercentage(80);
        table.setHorizontalAlignment(Element.ALIGN_CENTER);

        Font bold = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);

        PdfPCell cell1 = new PdfPCell(new Phrase("Producto", bold));
        PdfPCell cell2 = new PdfPCell(new Phrase("P.Unit", bold));
        PdfPCell cell3 = new PdfPCell(new Phrase("Cant.", bold));
        PdfPCell cell4 = new PdfPCell(new Phrase("Subtotal", bold));
        cell1.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell4.setHorizontalAlignment(Element.ALIGN_CENTER);

        // Solo borde inferior para encabezado
        cell1.setBorder(Rectangle.BOTTOM);
        cell2.setBorder(Rectangle.BOTTOM);
        cell3.setBorder(Rectangle.BOTTOM);
        cell4.setBorder(Rectangle.BOTTOM);

        cell1.setPadding(8);
        cell2.setPadding(8);
        cell3.setPadding(8);
        cell4.setPadding(8);

        table.addCell(cell1);
        table.addCell(cell2);
        table.addCell(cell3);
        table.addCell(cell4);

        for (DetalleFactura det : detalles) {
            PdfPCell c1 = new PdfPCell(new Phrase(det.getProducto().getNombre()));
            PdfPCell c2 = new PdfPCell(new Phrase(String.format("%.2f", det.getPrecioUnitario())));
            PdfPCell c3 = new PdfPCell(new Phrase(det.getCantidad().toString()));
            PdfPCell c4 = new PdfPCell(new Phrase(String.format("%.2f", det.getSubtotal())));

            // Solo borde inferior para líneas horizontales
            c1.setBorder(Rectangle.BOTTOM);
            c2.setBorder(Rectangle.BOTTOM);
            c3.setBorder(Rectangle.BOTTOM);
            c4.setBorder(Rectangle.BOTTOM);

            // Alineación y padding
            c1.setHorizontalAlignment(Element.ALIGN_LEFT);
            c2.setHorizontalAlignment(Element.ALIGN_CENTER);
            c3.setHorizontalAlignment(Element.ALIGN_CENTER);
            c4.setHorizontalAlignment(Element.ALIGN_CENTER);

            c1.setPadding(8);
            c2.setPadding(8);
            c3.setPadding(8);
            c4.setPadding(8);

            table.addCell(c1);
            table.addCell(c2);
            table.addCell(c3);
            table.addCell(c4);
        }

        document.add(table);

        // --- MÁS ESPACIO ---
        document.add(new Paragraph(" "));
        document.add(new Paragraph(" "));

        // --- TOTAL alineado con la tabla ---
        PdfPTable totalTable = new PdfPTable(4);
        totalTable.setWidthPercentage(80);
        totalTable.setHorizontalAlignment(Element.ALIGN_CENTER);

        // Celdas vacías para alinear el total a la derecha de la tabla
        PdfPCell vacio1 = new PdfPCell(new Phrase(" "));
        vacio1.setColspan(2);
        vacio1.setBorder(Rectangle.NO_BORDER);

        PdfPCell totalLabel = new PdfPCell(new Phrase("TOTAL:", bold));
        totalLabel.setHorizontalAlignment(Element.ALIGN_RIGHT);
        totalLabel.setBorder(Rectangle.NO_BORDER);

        PdfPCell totalValue = new PdfPCell(new Phrase("S/. " + String.format("%.2f", factura.getTotal()), bold));
        totalValue.setHorizontalAlignment(Element.ALIGN_RIGHT);
        totalValue.setBorder(Rectangle.NO_BORDER);

        totalTable.addCell(vacio1);
        totalTable.addCell(totalLabel);
        totalTable.addCell(totalValue);

        document.add(totalTable);

        // --- MÁS ESPACIO ---
        document.add(new Paragraph(" "));
        document.add(new Paragraph(" "));

        // --- MENSAJE FINAL ---
        Paragraph gracias = new Paragraph("¡Gracias por su compra!",
                FontFactory.getFont(FontFactory.HELVETICA_OBLIQUE, 12));
        gracias.setAlignment(Element.ALIGN_CENTER);
        document.add(gracias);

        document.close();
    }
}