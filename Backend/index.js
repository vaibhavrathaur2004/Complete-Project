const express = require('express');
const app = express();
const cookieparser = require('cookie-parser')
const authroutes = require('./routes/userroutes')
const foodroutes = require('./routes/foodroutes')
const foodpartnersroutes = require('./routes/foodpartner')
const {dbconnection}= require('./conifg/database')
const cors = require('cors')
require("dotenv").config();

const PORT = process.env.PORT || 3000

dbconnection()
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))
app.use(cookieparser())
app.use(express.json());

app.use("/api",authroutes);
app.use("/api/food",foodroutes);
app.use("/api/food-partner",foodpartnersroutes);


app.get("/",(req, res) => {
    res.send("server is running ✅");
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT} 🚀`);
})