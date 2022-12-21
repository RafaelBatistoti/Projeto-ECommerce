const expressAsyncHandler = require('express-async-handler')
const Product = require('../models/productModel')

const createProduct = expressAsyncHandler(async (req, res) => {

    try {
        const newProduct = await Product.create(req.body)
        res.json(newProduct)

    } catch (err) {
        throw new Error(`Was not possible create the product. Check the message: ${err}`)
    }
})

const getSigleProduct = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const findProduct = await Product.findById(id)
        res.json(findProduct)
    } catch (err) {
        throw new Error(`Was not possible get the product. Check the message: ${err}`)
    }
})

module.exports = {
    createProduct,
    getSigleProduct
};
