var express = require("express");
var mongodb = require('./mongodb');
var userApi = require("./main/UserApi")

mongodb.connect();
var app = express();
app.use(express.json())
app.use('/users/', userApi)
app.listen(3000, function () {
    console.log("Node server is running..");
});
