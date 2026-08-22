FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000 4000

CMD ["sh", "-c", "node index.js & node server.js & wait"]
