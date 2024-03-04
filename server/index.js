const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const dotenv = require('dotenv');

dotenv.config();

// Set up routing for app
app.use('/item/uploads', express.static(path.join(__dirname, 'uploads')));

const routes = require('./apis/routes');

app.use('/', routes);

app.listen(process.env.APP_HOST_PORT, (e) => {
  if (e) console.log('Error in server setup: ', e);
  console.log('Server is running on: ', process.env.APP_HOST_PORT);
});
