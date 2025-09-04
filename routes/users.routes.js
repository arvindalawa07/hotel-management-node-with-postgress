const express = require("express");
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require("../controllers/users.controller");


const router = express.Router();

// 🟢 Routes only (logic in controllers)
router.get("/", getAllUsers);          // Get all customers
router.get("/:id", getUserById);    // Get single customer by ID
router.post("/", createUser);       // Create new customer
router.patch("/:id", updateUser);     // Update customer by ID
router.delete("/:id", deleteUser);  // Delete customer by ID

module.exports = router;

module.exports = router;
