const { Customer } = require('../postgress/db');
const { Op } = require('sequelize');

// ✅ Create a new customer
const createCustomer = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // 🔍 Check if email or phone already exists
    const existingCustomer = await Customer.findOne({
      where: {
        [Op.or]: [{ email }, { phone }],
      },
    });

    if (existingCustomer) {
      if (existingCustomer.email === email) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      if (existingCustomer.phone === phone) {
        return res.status(400).json({ error: 'Phone already exists' });
      }
    }

    // ✅ Create new customer
    const newCustomer = await Customer.create({ name, email, phone });
    res.status(201).json(newCustomer);
  } catch (err) {
    console.error('Error creating customer:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ✅ Get all customers
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll({
      order: [['id', 'ASC']],
    });
    res.status(200).json(customers);
  } catch (err) {
    console.error('Error fetching customers:', err);
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
};

// ✅ Get single customer by ID
const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.status(200).json(customer);
  } catch (err) {
    console.error('Error fetching customer:', err);
    res.status(500).json({ error: 'Failed to fetch customer' });
  }
};

// ✅ Update customer
const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // 🔍 Check if new email/phone already exists (for other customers)
    if (email || phone) {
      const existingCustomer = await Customer.findOne({
        where: {
          [Op.or]: [{ email }, { phone }],
          id: { [Op.ne]: id }, // exclude current customer
        },
      });

      if (existingCustomer) {
        if (existingCustomer.email === email) {
          return res.status(400).json({ error: 'Email already exists' });
        }
        if (existingCustomer.phone === phone) {
          return res.status(400).json({ error: 'Phone already exists' });
        }
      }
    }

    // ✅ Update fields
    await customer.update({ name, email, phone });
    res.json(customer);
  } catch (err) {
    console.error('Error updating customer:', err);
    res.status(500).json({ error: 'Failed to update customer' });
  }
};

// ✅ Delete customer
const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    await customer.destroy();
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (err) {
    console.error('Error deleting customer:', err);
    res.status(500).json({ error: 'Failed to delete customer' });
  }
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
