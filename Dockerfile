FROM node:14-alpine

WORKDIR /home/node/app

COPY package*.json .

RUN npm i

COPY . .

ENV NODE_PATH=./build

RUN npm run build

EXPOSE 4000
CMD [ "npm", "run", "start" ]