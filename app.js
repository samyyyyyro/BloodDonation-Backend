const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const database = require("./config/database");
const app = express();


const PORT = process.env.PORT || 4000;

dotenv.config();

// Connecting to database
database.connect();
 
// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);

//ROUTES
app.use("/auth", require("./routers/authRouter"));
app.use("/user", require("./routers/userRouter"));
app.use("/bank", require("./routers/bankRouter"));
app.use("/camps", require("./routers/campRouter"));


app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});


// Listening to the server
app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});