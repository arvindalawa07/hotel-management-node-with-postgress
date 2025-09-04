require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./postgress/db');
const customerRoutes = require('./routes/customers.route');
const userRoutes = require('./routes/users.routes');

const app = express();
app.use(express.json());
dbConnection();

// Customers API
app.use("/api/v1/customer", customerRoutes);
app.use("/api/v1/user", userRoutes);

app.get('/', (req, res) => {
  res.send('Hello, Node.js with Express!');
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
