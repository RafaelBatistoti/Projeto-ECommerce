const jsonWebToken = require('jsonwebtoken');

const generateRefreshToken = (id) => {
    return jsonWebToken.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" })
}
module.exports = {
    generateRefreshToken
};