const { Client } = require('pg');
const User = require('./user');
const config = require('./../configs/db.json');

const dbClient = new Client(config);

dbClient.connect();

User.client = dbClient;

module.exports = {
  dbClient,
  User,
};
