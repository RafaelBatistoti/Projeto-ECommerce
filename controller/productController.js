const expressAsyncHandler = require('express-async-handler')
const Product = require('../models/productModel')
const slugify = require('slugify');

const createProduct = expressAsyncHandler(async (req, res) => {

    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
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
        if (findProduct === null) throw new Error(`There is no user for this id. Insert a valid ID`)
        res.json(findProduct)
    } catch (err) {
        throw new Error(`Was not possible get the product. Check the message: ${err}`)
    }
})

const deleteProduct = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const deleteItem = await Product.findByIdAndDelete(id)
        if (deleteItem === null) throw new Error(`There is no Item for this id. Insert a valid ID`)
        res.json(deleteItem)
    } catch (err) {
        throw new Error(`Was not possible delete the product. Check the message: ${err}`)
    }
})

const getAllProducts = expressAsyncHandler(async (req, res) => {
    try {
        const getAllItens = await Product.find()
        res.json(getAllItens)
    } catch (err) {
        throw new Error(`Error to find all products: ${err}`)
    }
})


const updateProduct = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
            req.body.title = slugify(req.body.title)
        }

        const title = slugify(req.body.title)
        const findProduct = await Product.findOne({ title })
        if (findProduct) {
            throw new Error(`Error to updated the product. This Item already exists`)
        }
        const upProduct = await Product.findByIdAndUpdate(id, {
            title: req?.body?.title,
            slug: req?.body?.slug,
            description: req?.body?.description,
            price: req?.body?.price,
            quantity: req?.body?.quantity,
        },
            {
                new: true
            })

        res.json(upProduct)

    } catch (err) {

        throw new Error(`Error to updated the product: ${err}`)
    }
})

module.exports = {
    createProduct,
    getSigleProduct,
    deleteProduct,
    updateProduct,
    getAllProducts
};
