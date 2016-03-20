'use strict';

var SevenWebserver = function Constructor(settings) {


    this.host = settings.host;
    this.port = settings.port;
    this.whatsapp = settings.whatzapp;


};
SevenWebserver.prototype.startUp = function () {
    var express = require("express");
    var fs = require("fs");
    var app = express();
    var bodyParser     =        require("body-parser");

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use(express.static(__dirname + "/../public")); //use static files in ROOT/public folder

    app.post("/subscribe", this.subScribe.bind(this));

    app.listen(this.port, this.host);
};

SevenWebserver.prototype.subScribe = function(request, response){ //root dir

    var number = request.body.number;
    if(number.charAt(0) === '0'){
        number = number.substr(1);
    }

    console.log(this);
    number = "49"+number+"@s.whatsapp.net";
    this.whatsapp.sendMessage(number,"Welcome to the New Whatsapp Service! Please type 'help' to get all commands");
    //console.log(request.body);
    response.send("Welcome to our Service");

};


module.exports = SevenWebserver;

