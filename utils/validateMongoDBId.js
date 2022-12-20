const moongose = require('mongoose')

const validateId = (id) => {
    const isValid = moongose.Types.ObjectId.isValid(id)
    if (!isValid) throw new Error('This id is not valid or id not found!')
}

module.exports = validateId;
