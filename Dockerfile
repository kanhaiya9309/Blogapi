
FROM node:18-alpine

# Set container timezone to India
ENV TZ=Asia/Kolkata
RUN apk add --no-cache tzdata

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000 4000

CMD ["sh", "-c", "node index.js & node server.js & wait"]
