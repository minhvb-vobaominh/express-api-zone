FROM node:20.11.1-alpine3.19

WORKDIR /app

COPY ./package*.json .

COPY ./yarn*.lock .

RUN yarn 

COPY . .

RUN yarn build

RUN npm i --global serve

EXPOSE 3000

CMD [ "serve", "./dist" ]
