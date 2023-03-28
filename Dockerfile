FROM node:19-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN apk add --update nodejs npm
RUN npm install


COPY . .

EXPOSE 8080
CMD [ "node", "index.js" ]