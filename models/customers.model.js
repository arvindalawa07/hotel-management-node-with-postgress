// models/Customer.js
const { DataTypes } = require("sequelize");
const createCustomerModel = (sequelize) => {
  const Customer = sequelize.define("Customer", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: { isEmail: true },
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
    },
  }, {
    timestamps: true, // automatically adds createdAt, updatedAt
  });
  return Customer;
}

module.exports = createCustomerModel;
