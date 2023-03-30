'use strict';
require('dotenv').config()
const express = require('express');
var cors = require('cors')
const { cats } = require('./models/catModel');
const catRouter = require('./routes/catRoute.js')
const userRouter = require('./routes/userRoute.js');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())
app.use("/cat", catRouter);
app.use("/user", userRouter);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
