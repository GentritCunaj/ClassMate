const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require('body-parser');
require('dotenv').config({path:"./config.env"})
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.listen(5000,()=>
{
    console.log("Server started");
})

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("connected"))
.catch((err)=>console.log(err));

