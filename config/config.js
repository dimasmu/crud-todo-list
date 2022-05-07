const dotenv = require('dotenv');
dotenv.config();

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DBNAME, MYSQL_PORT , TIMEZONE} = process.env;

module.exports = {
  "development": {
    "username": MYSQL_USER,
    "password": MYSQL_PASSWORD,
    "database": MYSQL_DBNAME,
    "host": MYSQL_HOST,
    "port": MYSQL_PORT,
    "dialect": "mysql",
    "timezone": TIMEZONE || "Asia/Jakarta",
    "logging": true,
  },
  
  "test": {
    "username": MYSQL_USER,
    "password": MYSQL_PASSWORD,
    "database": MYSQL_DBNAME,
    "host": MYSQL_HOST,
    "port": MYSQL_PORT,
    "dialect": "mysql",
    "timezone": TIMEZONE || "Asia/Jakarta",
  },

  "production": {
    "username": MYSQL_USER,
    "password": MYSQL_PASSWORD,
    "database": MYSQL_DBNAME,
    "host": MYSQL_HOST,
    "port": MYSQL_PORT,
    "dialect": "mysql",
    "pool": {
      "max": 20,
      "min": 0,
      "acquire": 60000,
      "idle": 10000
    },
    "logging": false,
    "timezone": TIMEZONE || "Asia/Jakarta",
  }
}
