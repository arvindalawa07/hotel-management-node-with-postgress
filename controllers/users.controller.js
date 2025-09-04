// controllers/user.controller.js
const bcrypt = require("bcryptjs");
const { User, sequelize } = require("../postgress/db"); // Make sure index.js exports User
const { Op } = require('sequelize');

/**
 * Create new user
 */
const createUser = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            email,
            phone,
            password,
            role,
            gender,
            dob,
            address,
            national_id,
        } = req.body;

        // 🔍 Check if email or phone already exists
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ email }, { phone }],
            },
        });

        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ error: 'Email already exists' });
            }
            if (existingUser.phone === phone) {
                return res.status(400).json({ error: 'Phone already exists' });
            }
        }
        // Hash password before saving
        const password_hash = await bcrypt.hash(password, 10);
        const user = await User.create({
            first_name,
            last_name,
            email,
            phone,
            password_hash,
            role,
            gender,
            dob,
            address,
            national_id,
        });

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                status: user.status,
            },
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Failed to create user" });
    }
};



/**
 * Get all users
 */
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ["password_hash"] },
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
};

/**
 * Get single user by ID
 */
const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: { exclude: ["password_hash"] },
        });

        if (!user) return res.status(404).json({ error: "User not found" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user" });
    }
};

/**
 * Update user
 */
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the user
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const {
            first_name,
            last_name,
            email,
            phone,
            password,
            role,
            gender,
            dob,
            address,
            national_id,
            status,
        } = req.body;


        // Update password only if provided
        if (password) {
            user.password_hash = await bcrypt.hash(password, 10);
        }

        // ✅ Only update the fields that are provided (PATCH style)
        if (first_name !== undefined) user.first_name = first_name;
        if (last_name !== undefined) user.last_name = last_name;
        if (email !== undefined) user.email = email;
        if (phone !== undefined) user.phone = phone;
        if (role !== undefined) user.role = role;
        if (gender !== undefined) user.gender = gender;
        if (dob !== undefined) user.dob = dob;
        if (address !== undefined) user.address = address;
        if (national_id !== undefined) user.national_id = national_id;
        if (status !== undefined) user.status = status;

        const conditions = [];
        if (email) conditions.push({ email });
        if (phone) conditions.push({ phone });

        if (conditions.length > 0) {
            console.log("Checking for existing user with conditions:", conditions);

            const existingUser = await User.findOne({
                where: { [Op.or]: conditions },
            });

            if (existingUser) { // prevent conflict with self
                if (email && existingUser.email === email) {
                    return res.status(400).json({ error: 'Email already exists' });
                }
                if (phone && existingUser.phone === phone) {
                    return res.status(400).json({ error: 'Phone already exists' });
                }
            }
        }

        // Save changes
        await user.save();
        const { password_hash, ...safeUser } = user.toJSON();

        res.json({
            message: "User updated successfully",
            user: safeUser,
        });


    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

/**
 * Delete user
 */
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await User.destroy({ where: { id } });
        if (!deleted) return res.status(404).json({ error: "User not found" });

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete user" });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};