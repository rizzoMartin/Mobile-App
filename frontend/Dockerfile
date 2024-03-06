# Usamos la imagen base de Node.js
FROM node:18-alpine3.19

# Configura el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia los archivos del proyecto al contenedor
COPY . .

# Expo CLI utiliza el puerto 19000 por defecto
EXPOSE 19000

# Comando para iniciar la aplicación Expo
CMD ["npx", "expo", "start", "--tunnel"]