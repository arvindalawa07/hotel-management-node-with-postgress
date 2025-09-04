require('dotenv').config();
const { Sequelize } = require('sequelize');
const createCustomerModel = require('../models/customers.model');
const createUserModel = require('../models/users.model');

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false }
    },
    logging: false,
  }
);

// Initialize models here
const Customer = createCustomerModel(sequelize);
const User = createUserModel(sequelize);

const dbConnection = async () => {
  try {
    console.log('🔄 Connecting to the database...');
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('✅ Database connected & synced');
  } catch (error) {
    console.error('❌ Database connection error :', error);
  }
};

module.exports = { sequelize, Customer, dbConnection, User };
