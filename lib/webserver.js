'use strict';

var SevenWebserver = function Constructor(settings) {

    var fs = require("fs");
    var host = "127.0.0.1";
    var port = 1337;
    var express = require("express");

    var app = express();
    app.use(express.static(__dirname + "/public")); //use static files in ROOT/public folder

    app.get("/getSports", function(request, response){ //root dir


        response.send("Hello!!");
    });

    app.listen(port, host);
};





module.exports = SevenWebserver;

