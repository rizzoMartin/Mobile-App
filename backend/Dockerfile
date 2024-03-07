FROM node:18-alpine3.19

WORKDIR /app

COPY package*.json ./

RUN npm install -g nodemon
RUN npm install

COPY . .

EXPOSE 3000

#CMD ["npm", "start"]
CMD ["nodemon", "index.js"]