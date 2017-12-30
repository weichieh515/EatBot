const express = require("express"),
    app = express(),
    bodyParser = require("body-parser");
const mongoose = require('mongoose');
//modules
const router = require('./app/router/index');


//config
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(router);


app.listen(port, function () {
    console.log(`Server started on port ${port}`);
});