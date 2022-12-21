const User = require('../models/userModel')
const asyncExpressHandler = require('express-async-handler');
const { generateToken } = require('../config/jsonWebToken');
const validateId = require('../utils/validateMongoDBId');
const { generateRefreshToken } = require('../config/refreshToken');
const jwt = require('jsonwebtoken');


const createUser = asyncExpressHandler(async (req, res) => {
    const email = req.body.email
    const findUser = await User.findOne({ email: email })
    if (!findUser) {
        const newUser = await User.create(req.body)
        res.json(newUser)
    } else {
        throw new Error('User already exists!')
    }
})

const loginUserCntroller = asyncExpressHandler(async (req, res) => {
    const { email, password } = req.body
    const findUser = await User.findOne({ email })
    if (findUser && await findUser.isPasswordMatched(password)) {
        const refreshToken = await generateRefreshToken(findUser?._id)
        const updateUser = await User.findByIdAndUpdate(findUser.id, {
            refreshToken: refreshToken
        }, {
            new: true
        })
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            token: generateToken(findUser?._id)

        })
    } else {
        throw new Error('Invalid Credentials!!')
    }
})

const getAllUsers = asyncExpressHandler(async (req, res) => {
    try {
        const getUsers = await User.find()
        res.json(getUsers)
    } catch (err) {
        throw new Error(`Error to find all Users: ${err}`)
    }
})

const getSingleUsers = asyncExpressHandler(async (req, res) => {
    try {
        validateId(id)
        const { id } = req.params
        const getAUsers = await User.findById(id)
        if (getAUsers === null) throw new Error(`There is no user for this id. Insert a valid ID`)
        res.json(getAUsers)
    } catch (err) {
        throw new Error(`Error to find the User: ${err}`)
    }
})

const deleteUser = asyncExpressHandler(async (req, res) => {
    try {
        const { id } = req.params
        validateId(id)
        const deleteUser = await User.findByIdAndDelete(id)
        if (deleteUser === null) throw new Error(`There is no user for this id. Insert a valid ID`)
        res.json(deleteUser)
    } catch (err) {
        throw new Error(`Error to delete the User: ${err}`)
    }
})

const hendlerRefreshToken = asyncExpressHandler(async (req, res) => {
    const cookie = req.cookies
    if (!cookie?.refreshToken) throw new Error(`No refresh token in cookies`)
    const refreshToken = cookie.refreshToken
    const user = await User.findOne({ refreshToken })
    if (!user) throw new Error(`No refresh token present in db or not matched`)
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || user.id !== decoded.id) {
            throw new Error(`There is something wrong with refresh token`)
        }
        const accessToken = generateToken(user?._id)
        res.json({ accessToken })
    })
})

const logout = asyncExpressHandler(async (req, res) => {
    const cookie = req.cookies
    if (!cookie?.refreshToken) throw new Error(`No refresh token in cookies`)
    const refreshToken = cookie.refreshToken
    const user = await User.findOne({ refreshToken })
    if (!user) {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true
        })
    }
    await User.findOneAndUpdate(refreshToken, {
        refreshToken: "",
    })
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
    })
    res.sendStatus(204)
})

const updateUser = asyncExpressHandler(async (req, res) => {
    const { _id } = req.user
    validateId(_id)
    try {
        const upUser = await User.findByIdAndUpdate(_id, {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
        },
            {
                new: true
            })
        res.json(upUser)
    } catch (err) {
        const email = req.body.email
        const findUser = await User.findOne({ email: email })
        if (findUser) {
            throw new Error(`Error to updated the User. This user already exists: ${err}`)
        } else {

            throw new Error(`Error to updated the User: ${err}`)
        }

    }
})

const blockUser = asyncExpressHandler(async (req, res) => {
    const { id } = req.params
    validateId(id)
    try {

        const block = await User.findByIdAndUpdate(id, {
            isBlock: true
        }, {
            new: true
        })
        if (block === null) throw new Error(`There is no user for this id. Insert a valid ID`)
    } catch (err) {
        throw new Error(err)
    }

    res.json({
        message: 'User blocked!'
    })
})
const unBlockuser = asyncExpressHandler(async (req, res) => {
    const { id } = req.params

    try {
        const unBlock = await User.findByIdAndUpdate(id, {
            isBlock: false
        }, {
            new: true
        },)
        if (unBlock === null) throw new Error(`There is no user for this id. Insert a valid ID`)
    } catch (err) {
        throw new Error(err)
    }
    res.json({
        message: 'User Unblocked!'
    })
})


module.exports = {
    createUser,
    loginUserCntroller,
    getAllUsers,
    getSingleUsers,
    deleteUser,
    updateUser,
    blockUser,
    unBlockuser,
    hendlerRefreshToken,
    logout

};


