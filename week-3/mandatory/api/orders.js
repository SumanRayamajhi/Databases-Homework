const secrets = require("./secrets.json");
const { Pool } = require("pg");
const connection = new Pool(secrets);

//get all orders
const getAllOrders = async (req, res) => {
  try {
    const result = await connection.query(`select * from orders`);
    await res.status(200).send(result.rows);
  } catch (err) {
    console.log(err);
  }
};

//get orders by id
const getOrdersById = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const result = await connection.query(`select * from orders where id=$1`, [
      orderId,
    ]);
    res.status(200).send(result.rows);
  } catch (err) {
    console.log(err);
  }
};

//- Add a new DELETE endpoint `/orders/:orderId` to delete an existing order along all the associated order items.
const deleteOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    await connection.query(`delete from order_items where order_id=$1`, [
      orderId,
    ]);
    await connection.query(`delete from orders where id=$1`, [orderId]);

    res.status(200).send(`Order Id: ${orderId} has been sucessfully deleted!`);
  } catch (err) {
    console.log(err);
  }
};
module.exports = { getAllOrders, getOrdersById, deleteOrderById };
