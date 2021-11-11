const secrets = require("secrets.json");
const { Pool } = require("pg");
const pool = new Pool(secrets);

// Get all products
const GetAllProducts = async (req, res) => {
  try {
    const result = await pool.query(`select * from products`);
    await res.status(200).send(result.rows);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  GetAllProducts,
};
