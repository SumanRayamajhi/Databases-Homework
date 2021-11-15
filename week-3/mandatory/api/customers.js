const secrets = require("./secrets.json");
const { Pool } = require("pg");
const connection = new Pool(secrets);

// Get all customers
const getAllCustomers = async (req, res) => {
  try {
    const result = await connection.query(`select * from customers`);
    await res.status(200).send(result.rows);
  } catch (err) {
    console.log(err);
  }
};

// Add a new GET endpoint `/customers/:customerId` to load a single customer by ID.
//Get a customer by ID

const getCustomerById = async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const result = await connection.query(
      `SELECT * FROM customers WHERE id=$1`,
      [customerId]
    );
    await res.status(201).send(result.rows);
  } catch (err) {
    console.log(err);
  }
};

//Add a new POST endpoint `/customers` to create a new customer.
const addNewCustomer = async (req, res) => {
  try {
    const newCustomerName = req.body.name;
    const newCustomerAddress = req.body.address;
    const newCustomerCity = req.body.city;
    const newCustomerCountry = req.body.country;

    const result = await connection.query(
      "select * from customers where name=$1",
      [newCustomerName]
    );
    if (result.rows.length > 0) {
      return res.status(400).send("Name is already exist!");
    } else {
      const query = `insert into customers (name, address, city, country) values ($1, $2, $3, $4) returning id`;
      const insertedResult = await connection.query(query, [
        newCustomerName,
        newCustomerAddress,
        newCustomerCity,
        newCustomerCountry,
      ]);
      const responseBody = { CustomerId: insertedResult.rows[0].id };
      res.status(201).send(responseBody);
    }
  } catch (err) {
    console.log(err);
  }
};

// Add a new GET endpoint /customers/:customerId/orders to load all the orders
//along the items in the orders of a specific customer. Especially, the following
//information should be returned: order references, order dates, product names,
//unit prices, suppliers and quantities.
const getCustomerOrdersByCustomerId = async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const query = `select o.order_reference, o.order_date, p.product_name, oi.quantity, customer_id 
                 from orders o
                 inner join order_items oi on oi.order_id = o.id
                 inner join customers c on c.id = o.customer_id
                 inner join products p on p.id = oi.product_id 
                 where o.customer_id = $1`;
    const result = await connection.query(query, [customerId]);
    res.status(200).send(result.rows);
  } catch (err) {
    console.log(err);
  }
};

//- Add a new PUT endpoint `/customers/:customerId` to update an existing customer (name, address, city and country).
const updatingExistingCustomer = async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const newCustomerName = req.body.name;
    const newCustomerAddress = req.body.address;
    const newCustomerCity = req.body.city;
    const newCustomerCountry = req.body.country;

    const customerQuery = `update customers set name=$1, address=$2, city=$3, country=$4
  where id=$5 `;
    const result = await connection.query(customerQuery, [
      newCustomerName,
      newCustomerAddress,
      newCustomerCity,
      newCustomerCountry,
      customerId,
    ]);
    res.json("Customers new information is updated!");
    res.status(200).send(result.rows);
  } catch (err) {
    console.log(err);
  }
};

//Add a new POST endpoint `/customers/:customerId/orders` to create a new order
//(including an order date, and an order reference) for a customer.
//Check that the customerId corresponds to an existing customer or return an error.

const addOrdersBySpecificCustomerId = async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const newOrderDate = new Date();
    const newOrderReference = req.body.order_reference;

    const result = await connection.query(
      `select * from customers where id=$1`,
      [customerId]
    );
    if (result.rows.length === 0) {
      return res.status(400).send("Customer Id does not exist");
    }
    if (!newOrderReference) {
      return res.status(400).send("Please provide an order reference");
    }
    const insertQuery = `insert into orders (order_date, order_reference, customer_id) values ($1, $2, $3) returning id`;
    await connection.query(insertQuery, [
      newOrderDate,
      newOrderReference,
      customerId,
    ]);
    res.status(200).send("Order created!");
  } catch (err) {
    console.log(err);
  }
};

//- Add a new DELETE endpoint `/customers/:customerId` to delete an existing customer only if this customer doesn't have orders.
const deleteCustomerWithId = async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const customerQuery = `select * from orders where customer_id=$1`;

    const findCustomers = await connection.query(customerQuery, [customerId]);

    const orders = findCustomers.rows;
    if (orders.length > 0) {
      res.status(400).send(`Customer id: ${customerId} has orders!`);
    } else {
      const deleteOrderQuery = `delete from orders o where o.customer_id=$1`;
      const deleteCustomerQuery = `delete from customers where id=$1`;

      await connection.query(deleteOrderQuery, [customerId]);
      await connection.query(deleteCustomerQuery, [customerId]);
      res
        .status(200)
        .send(`Customer id: ${customerId} has been deleted successfully!`);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  updatingExistingCustomer,
  deleteCustomerWithId,
  getCustomerOrdersByCustomerId,
  addNewCustomer,
  addOrdersBySpecificCustomerId,
};
