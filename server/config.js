const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'developement',
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 8000,
};
