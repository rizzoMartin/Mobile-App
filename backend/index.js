const initDatabase = require('./data/sincro');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send("Hola Mundoooo!");
});




// Manejar las señales de finalización del programa
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received. Exiting.');
  server.close();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received. Exiting.');
  server.close();
  process.exit(0);
});

// Inicializar la base de datos y luego iniciar el servidor
initDatabase().then(() => {
  server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});