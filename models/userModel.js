const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Declare the Schema of the Mongo model

/*
{
	"firstname":"Rafael",
	"lastname":"Batistoti",
	"email":"rafael@gmail.com",
	"password":"Nokia@123"
}
*/

const userSchema = new mongoose.Schema({
	firstname: {
		type: String,
		required: true,
	},
	lastname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},

	password: {
		type: String,
		required: true,
	},
	isBlock: {
		type: Boolean,
		default: false
	},

	role: {
		type: String,
		default: "user"
	},
	cart: {
		type: Array,
		default: []
	},
	address: [{ type: mongoose.Schema.Types.ObjectId, ref: 'address' }],
	wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
	refreshToken: {
		type: String
	}

}, {
	timestamps: true
});

userSchema.pre('save', async function () {
	const salt = bcrypt.genSaltSync(10);
	this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password)
}

//Export the model
module.exports = mongoose.model('User', userSchema);
