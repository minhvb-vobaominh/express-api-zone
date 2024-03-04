FROM node:18-alpine3.18

WORKDIR /app

COPY ./package*.json .

COPY ./yarn*.lock .

RUN yarn install

COPY . .

VOLUME [ "/app/uploads" ]

EXPOSE 8000

CMD [ "node", "index.js" ]