const expressAsyncHandler = require('express-async-handler')
const Product = require('../models/productModel')

const createProduct = expressAsyncHandler(async(req,res)=>{
    res.json('Product posted!!')
})

module.exports = {
    createProduct
};
