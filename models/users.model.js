// models/User.js
const { DataTypes } = require("sequelize");

const createUserModel = (sequelize) => {
    const User = sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },
            first_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            last_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(150),
                allowNull: false,
                unique: true,
                validate: { isEmail: true },
            },
            phone: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: true,
            },
            password_hash: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            role: {
                type: DataTypes.ENUM("admin", "manager", "staff", "guest"),
                allowNull: false,
                defaultValue: "guest",
            },
            gender: {
                type: DataTypes.ENUM("male", "female", "other"),
                allowNull: false,
            },
            dob: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            address: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            national_id: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            status: {
                type: DataTypes.ENUM("active", "inactive", "blocked"),
                allowNull: false,
                defaultValue: "active",
            },
            last_login_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            timestamps: true, // adds createdAt and updatedAt
            underscored: true, // maps createdAt -> created_at, updatedAt -> updated_at
        }
    );

    return User;
};

module.exports = createUserModel;
