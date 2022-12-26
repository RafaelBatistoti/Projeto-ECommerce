const express = require("express");
const { createProduct, getSigleProduct, deleteProduct, updateProduct, getAllProducts } = require("../controller/productController");
const { authMiddleware, isAdmin } = require('../middlewares/authMiddlewares');
const routes = express.Router()

routes.post('/', authMiddleware, isAdmin, createProduct)
routes.get('/:id', getSigleProduct)
routes.get('/', getAllProducts)
routes.delete('/:id', authMiddleware, isAdmin, deleteProduct)
routes.put('/edit-product/:id', authMiddleware, isAdmin, updateProduct)

module.exports = routes 
