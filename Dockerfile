# FROM node:20.11.0-alpine3.19
FROM node:lts-alpine3.18

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

CMD ["npm", "run", "start"]