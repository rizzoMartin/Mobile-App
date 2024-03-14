const app = require('./app');
const initDatabase = require('./data/sincro');
const PORT = process.env.PORT || 3000;

// Ruta para probar la conexión rápido en desarrollo
app.get('/', (req, res) => {
    res.send('Hola Mundoooo!')
});

// Inicializar la base de datos
initDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});



/* 
En caso de querer usar https ser debería añadir/modificar lo siguiente:

const PORT = process.env.PORT || 443;
const fs = require('fs');
const https = require('https');


const options = {
  key: fs.readFileSync('./certServ.pem'),
  cert: fs.readFileSync('./certServ.pem')
};

initDatabase().then(() => {
  server = https.createServer(options, app).listen(PORT, () => {
    console.log(`Server running on port ${PORT} with HTTPS`);
  });
});
*/

// Manejar las señales de finalización del programa
process.on('SIGTERM', () => {
    //console.log('SIGTERM signal received. Exiting.');
    server.close();
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received. Exiting.');
    server.close();
    process.exit(0);
});

