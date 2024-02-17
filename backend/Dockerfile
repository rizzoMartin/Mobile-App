# Elegir la versión de node.js a utilizar
FROM node:21

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Instalar dockerize
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# Copiar los archivos de configuración del proyecto (`package.json` y, opcionalmente, `package-lock.json`) al directorio de trabajo
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos del proyecto al directorio de trabajo
COPY . .

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Usar dockerize para esperar a la base de datos antes de iniciar la aplicación
CMD dockerize -wait tcp://database:3306 -timeout 100s npm start
