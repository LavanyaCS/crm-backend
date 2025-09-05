const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8081;
const cors = require("cors");
//Route
const authRoute = require("./routes/authRoute");
const customerRoute = require("./routes/customerRoute");
const caseRoute = require("./routes/caseRoute");
//db connect
const dbConnection = require("./config/dbConnection");
//Middleware
app.use(express.json());
app.use(cors());
app.use("/api/auth",authRoute);
app.use("/api/customer",customerRoute);
app.use("/api/case",caseRoute);
//callback function of db
dbConnection();
//APP LISTENING
app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})