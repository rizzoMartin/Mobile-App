# Usa la misma versión de Node que el back-end
FROM node:21

# Instala expo-cli globalmente
RUN npm install -g expo-cli

# Opcionalmente, instala @expo/ngrok globalmente para evitar cualquier solicitud interactiva
# Aunque este paso no es estrictamente necesario si ya no aparecen solicitudes de instalación interactiva
RUN npm install -g @expo/ngrok@^4.1.0

# Configura el directorio de trabajo
WORKDIR /front

# Copia los archivos del proyecto Expo al contenedor
COPY . .

# Instala las dependencias del proyecto
RUN npm install

# Expone el puerto predeterminado de Expo (19000 para el paquete, 19001 para Metro Bundler)
# Además de los puertos para el túnel ngrok que Expo podría utilizar
EXPOSE 19000
EXPOSE 19001
# Expo Developer Tools
EXPOSE 19002 


# Inicia la aplicación Expo en modo no interactivo
CMD ["npx", "expo", "start", "--tunnel", "--non-interactive"]
