# Elegir la versión de node.js a utilizar
FROM node:21

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos de configuración del proyecto (`package.json` y, opcionalmente, `package-lock.json`) al directorio de trabajo
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos del proyecto al directorio de trabajo
COPY . .

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Iniciar la app
CMD npm start
