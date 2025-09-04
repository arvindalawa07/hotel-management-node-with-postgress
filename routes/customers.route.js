const express = require("express");
const {
    getCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
} = require("../controllers/customers.controller");


const router = express.Router();

// 🟢 Routes only (logic in controllers)
router.get("/", getCustomers);          // Get all customers
router.get("/:id", getCustomerById);    // Get single customer by ID
router.post("/", createCustomer);       // Create new customer
router.patch("/:id", updateCustomer);     // Update customer by ID
router.delete("/:id", deleteCustomer);  // Delete customer by ID

module.exports = router;

module.exports = router;
