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
// Allow requests from your Netlify frontend
app.use(cors({
  origin: "https://crm-frontend-mern.netlify.app",  // your Netlify domain
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// app.use(cors());
app.get('/', (req, res) => {
  res.send('Backend is running ✅');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});
app.get('/', (req, res) => {
  res.send('Backend is running ✅');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});
// Allow requests from your Netlify frontend
app.use(cors({
  origin: "https://crm-frontend-mern.netlify.app",  // your Netlify domain
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use("/api/auth",authRoute);
app.use("/api/customer",customerRoute);
app.use("/api/case",caseRoute);
//callback function of db
dbConnection();
//APP LISTENING
app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})