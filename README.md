# Tienda H&M

Aplicación Full Stack desarrollada con React, Spring Boot y SQL Server.

## Requisitos previos

- Java 21
- Maven
- Node.js 22+
- SQL Server (local o remoto) + SSMS

## Configuración de la base de datos

1. Abre SSMS y ejecuta el script `database/TiendaHYM.sql` — crea la base `TiendaHYM`, sus tablas, relaciones y datos de ejemplo.

## Variables de entorno (backend)

El backend no usa credenciales hardcodeadas. Antes de correrlo:

1. Copia `Backend-TiendaHyM/.env.example` como `Backend-TiendaHyM/.env`
2. Reemplaza los valores con tu configuración local de SQL Server:

El `.env` se lee automáticamente gracias a la dependencia `spring-dotenv` (ver `pom.xml`). `.env` nunca se sube a Git (está en `.gitignore`); solo `.env.example` queda como plantilla.

## Estructura del proyecto

Tienda-HyM/
├── frontend/ # React + Vite + Tailwind
├── Backend-TiendaHyM/ # Spring Boot + JPA
├── database/
│ └── TiendaHYM.sql # Script completo (estructura + datos)
└── README.md

## Frontend

```bash
`cd frontend`
npm install
npm run dev
servidor: http://localhost:5173
```

## Backend

```bash
cd backend-tiendahym
mvn spring-boot:run
servidor: http://localhost:8080
```
