🚀 DevPortfolio – Plataforma de Portafolios y Asesorías
<p align="center"> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0xScveNFCW3xZWdROhdo491JguVTqCngLFA&s" alt="Logo Universidad" width="180"/> </p>
👥 Equipo del Proyecto

Repositorio del proyecto:
https://github.com/Juanfernando518/Proyecto--Interciclo.git

Integrantes

David Villa
GitHub: https://github.com/Davidvillahdz

Juan Alvarez
GitHub: https://github.com/Juanfernando518

⚙️ Tecnologías Utilizadas
Frontend

Angular

TypeScript

HTML5

CSS3 (diseño moderno y responsive)

Backend

Java 17

Spring Boot

Spring Security (JWT)

Spring Data JPA

PostgreSQL

JavaMailSender (SMTP Gmail)

Swagger / OpenAPI (documentación de API)

Despliegue

Backend desplegado en Render

Frontend desplegado en GitHub Pages / Firebase Hosting

Comunicación completa mediante servicios REST

📌 Descripción del Proyecto

DevPortfolio es una plataforma web que permite conectar usuarios con programadores profesionales mediante la visualización de portafolios y la gestión de solicitudes de asesoría.

El sistema está basado en una arquitectura cliente-servidor:

El frontend desarrollado en Angular consume servicios REST.

El backend desarrollado en Spring Boot gestiona usuarios, roles, proyectos y solicitudes.

Los datos se almacenan en una base de datos PostgreSQL.

Se implementa seguridad mediante JWT.

El objetivo principal es ofrecer un entorno moderno, seguro y organizado para mostrar proyectos y coordinar asesorías técnicas.

👤 Roles del Sistema

El sistema cuenta con tres roles principales:

🛡️ Administrador

Funciones:

Gestión de usuarios:

Cambiar roles (ascender o descender).

Eliminar usuarios.

Supervisión general del sistema.

Visualización global de solicitudes.

Control administrativo de la plataforma.

👨‍💻 Programador

Funciones:

Acceso a su panel (Dashboard).

Gestión de proyectos:

Crear proyectos.

Visualizar proyectos.

Eliminar proyectos.

Visualización de solicitudes recibidas.

Aceptar o rechazar solicitudes.

Visualización de estadísticas básicas.

👤 Usuario

Funciones:

Registro e inicio de sesión.

Visualización de programadores disponibles.

Consulta de portafolios.

Envío de solicitudes de asesoría.

Visualización del estado de sus solicitudes (pendiente, aceptada o rechazada).

📅 Gestión de Solicitudes

El sistema permite crear solicitudes de asesoría entre usuarios y programadores.

Cada solicitud contiene:

Usuario solicitante.

Programador asignado.

Tema o descripción.

Fecha de creación.

Estado (Pendiente, Aceptada, Rechazada).

Los programadores pueden:

Revisar solicitudes entrantes.

Aceptarlas o rechazarlas.

Los usuarios pueden:

Consultar el estado de sus solicitudes.

📧 Sistema de Correo Electrónico

El backend implementa un sistema de envío de correos automáticos utilizando SMTP de Gmail mediante JavaMailSender.

Funcionalidad:

Envío de notificaciones cuando una solicitud es aceptada o rechazada.

Ejecución asíncrona para no afectar el rendimiento del sistema.

🔐 Seguridad

Autenticación mediante JWT.

Protección de rutas según rol.

Validación del token en cada petición.

Separación de permisos por tipo de usuario.

🌐 Comunicación REST

Toda la comunicación entre frontend y backend se realiza mediante servicios REST:

GET → obtener información

POST → crear registros

PUT → actualizar datos

DELETE → eliminar registros

📄 Documentación de la API

La API REST se encuentra documentada con Swagger / OpenAPI.

Ejemplo de acceso:

https://<url-backend>/swagger-ui.html

🚀 Despliegue
Backend

Desplegado en Render.

Base de datos PostgreSQL en la nube.

Frontend

Desplegado en GitHub Pages o Firebase Hosting.

Conectado al backend mediante URL pública.

🔁 Flujos Principales del Sistema
Flujo de Inicio de Sesión

El usuario accede al login.

Ingresa sus credenciales.

El backend valida y genera un token JWT.

Se redirige según su rol:

Administrador → Panel administrativo.

Programador → Dashboard.

Usuario → Vista general.

Flujo del Usuario

Visualiza programadores.

Consulta portafolios.

Envía solicitudes de asesoría.

Revisa el estado de sus solicitudes.

Flujo del Programador

Accede a su dashboard.

Gestiona proyectos.

Revisa solicitudes recibidas.

Acepta o rechaza solicitudes.

Flujo del Administrador

Gestiona usuarios.

Cambia roles.

Supervisa solicitudes.

Control general del sistema.

🎯 Objetivo del Proyecto

Construir una plataforma web moderna que permita:

Mostrar portafolios profesionales.

Gestionar solicitudes de asesoría.

Implementar control de acceso por roles.

Integrar frontend y backend mediante servicios REST.

Aplicar buenas prácticas de desarrollo web y despliegue en la nube.

📌 Conclusiones

El proyecto DevPortfolio integra múltiples tecnologías modernas logrando un sistema completo de gestión de portafolios y solicitudes.

✅ Logros

Integración de frontend y backend mediante REST.

Implementación de roles con control de acceso.

Gestión de proyectos y solicitudes.

Despliegue en la nube.

Documentación de la API con Swagger.

Interfaz moderna y responsive.

🚀 Posibles mejoras futuras

Chat interno entre usuarios y programadores.

Sistema de pagos.

Calificaciones y reseñas.

Calendario visual de asesorías.

Notificaciones avanzadas.

App móvil con Ionic o Flutter.