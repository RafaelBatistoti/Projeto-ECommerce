const express = require("express");
const { createProduct, getSigleProduct, deleteProduct, updateProduct, getAllProducts } = require("../controller/productController");

const routes = express.Router()

routes.post('/', createProduct)
routes.get('/:id', getSigleProduct)
routes.get('/', getAllProducts)
routes.delete('/:id', deleteProduct)
routes.put('/edit-product/:id', updateProduct)

module.exports = routes
