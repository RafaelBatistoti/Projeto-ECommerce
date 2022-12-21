const express = require("express");
const { createProduct, getSigleProduct } = require("../controller/productController");

const routes = express.Router()

routes.post('/', createProduct)
routes.get('/:id', getSigleProduct)

module.exports = routes
