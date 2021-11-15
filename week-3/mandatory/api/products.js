const secrets = require("./secrets.json");
const { Pool } = require("pg");
const connection = new Pool(secrets);

//Get all products by id
const getProductsById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const result = await connection.query(
      `select * from products where id=$1`,
      [productId]
    );
    await res.status(200).send(result.rows);
  } catch (err) {
    console.log(err);
  }
};

//GET endpoint `/products` to filter the list of products by name using a query parameter,
//for example `/products?name=Cup`. This endpoint should still work even if you don't use
//the `name` query parameter!
const getProductsByName = async (req, res) => {
  try {
    const newName = req.query.name;
    const result = newName
      ? await connection.query(
          `SELECT * FROM products p
          INNER JOIN suppliers s ON p.supplier_id = s.id 
          WHERE p.product_name LIKE '%${newName}%'`
        )
      : await connection.query(
          `SELECT * FROM products p 
          INNER JOIN suppliers s ON p.supplier_id = s.id`
        );
    res.json(result.rows);
  } catch (err) {
    console.log(err);
  }
};

//Add a new POST endpoint `/products` to create a new product (with a product name,
//a price and a supplier id). Check that the price is a positive integer and that the
//supplier ID exists in the database, otherwise return an error.
const getBadRequestProductResponse = () => {
  return {
    message: "The current product is not valid",
    rules: [
      "The supplier must exits",
      "The unit price must be a positive number",
    ],
  };
};
const addNewProduct = async (req, res) => {
  try {
    const newProductName = req.body.product_name;
    const newUnitPrice = req.body.unit_price;
    const newSupplierId = req.body.supplier_id;
    const productBody = req.body;

    const supplierResult = await connection.query(
      `select * from suppliers where id=$1`,
      [productBody.supplier_id]
    );
    if (
      supplierResult.rows.length === 0 ||
      !Number.isInteger(productBody.unit_price) ||
      productBody.unit_price <= 0
    ) {
      return res.status(400).json(getBadRequestProductResponse());
    }
    const newProduct =
      "INSERT INTO products (product_name, unit_price, supplier_id) VALUES ($1, $2, $3) returning id";

    const insertResult = await connection.query(newProduct, [
      newProductName,
      newUnitPrice,
      newSupplierId,
    ]);
    const responseBody = { productId: insertResult.rows[0].id };
    await res.status(200).send(responseBody);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getProductsById, getProductsByName, addNewProduct };
