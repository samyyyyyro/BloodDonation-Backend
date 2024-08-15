const mongoose = require("mongoose");
require("dotenv").config();

const { CONNECT } = process.env;

exports.connect = () => {
	mongoose
		.connect(CONNECT, {
			useNewUrlparser: true,
			useUnifiedTopology: true,
		})
		.then(console.log(`DB Connection Success`))
		.catch((err) => {
			console.log(`DB Connection Failed`);
			console.log(err);
			process.exit(1);
		});
};