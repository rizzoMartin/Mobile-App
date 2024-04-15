Para acceder al frontend desde el navegador se debe poner la url que aparece al hacer docker-compose up (quitando exp://):
Metro waiting on exp://xxxxxx-anonymous-8081.exp.direct

Para acceder al frontend desde el movil se debe descargar la app expo go y escanear el código QR que aparece al hacer docker-compose up o poner la url (con exp://):
Metro waiting on exp://xxxxxx-anonymous-8081.exp.direct

Para que la app funcione correctamente, el archivo ip.js del frontend debe contener la ip del ordenador y tanto el movil como el ordenador tienen que estar en la misma red wifi(no funciona en eduroam)

Si no va el tunnel se debe modificar en frontend/.expo/settings.json la url por una cadena de 6 caracteres