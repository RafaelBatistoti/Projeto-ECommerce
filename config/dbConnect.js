const { default: mongoose } = require('mongoose');

const dBConnect = () => {
	mongoose.set('strictQuery', false)
	mongoose.connect(process.env.DBCONNECT, err => {
		if (!err) {
			console.log('MongoDB Connection Succeeded.');
		} else {
			console.log('Error in DB connection: ' + err);
		}
	}
	);
};

module.exports = dBConnect;
