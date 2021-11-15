const express = require("express");
const app = express();
const PORT = 5000;
const { getAllOrders, getOrdersById, deleteOrderById } = require("./orders");
const {
  getProductsById,
  getProductsByName,
  addNewProduct,
} = require("./products");
const {
  getAllCustomers,
  getCustomerById,
  updatingExistingCustomer,
  deleteCustomerWithId,
  getCustomerOrdersByCustomerId,
  addNewCustomer,
  addOrdersBySpecificCustomerId,
} = require("./customers");

app.use(express.json());

app.get("/products/:productId", getProductsById);
app.get("/products", getProductsByName);
app.post("/products", addNewProduct);

app.get("/customers", getAllCustomers);
app.get("/customers/:customerId", getCustomerById);
app.put("/customers/:customerId", updatingExistingCustomer);
app.delete("/customers/:customerId", deleteCustomerWithId);
app.get("/customers/:customerId/orders", getCustomerOrdersByCustomerId);
app.post("/customers", addNewCustomer);
app.post("/customers/:customerId/orders", addOrdersBySpecificCustomerId);

app.get("/orders", getAllOrders);
app.get("/orders/:orderId", getOrdersById);
app.delete("/orders/:orderId", deleteOrderById);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}. Ready to accept request.`);
});
