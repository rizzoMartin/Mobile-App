CREATE DATABASE IF NOT EXISTS prueba; -- Asegúrate de que la base de datos exista

USE prueba; -- Selecciona la base de datos

-- Crea una tabla de prueba
CREATE TABLE IF NOT EXISTS mi_tabla (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
