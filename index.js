require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');

const listingsRouter = require('./routes/listings');
const userRouter = require('./routes/user');

const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: "http://localhost:3000",    //point to where react app is hosted
  credentials: true,
}));

app.use(session({
  secret:'hackthenorth2020abr',
  resave: false,  
  saveUninitialized: false,
  cookie: {secure: true},
}));

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use(listingsRouter);
app.use(userRouter);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connection with MongoDB successfully established");
});

app.listen(PORT, () => {
  console.log("The server started at port " + PORT);
});






