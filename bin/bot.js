'use strict';



var config = require('../config.json');



var SevenHackBot = require('../lib/sevenhackbot');

var token = config.APIKEY;
var path = require('path');
var dbPath = path.resolve(process.cwd(), "data",config.DBPATH);
var name = config.NAME;

var norrisbot = new SevenHackBot({
    token: token,
    dbPath: dbPath,
    name: name
});

norrisbot.run();

var fs = require("fs");
var host = "127.0.0.1";
var port = 1337;
var express = require("express");

var app = express();
app.use(express.static(__dirname + "/public")); //use static files in ROOT/public folder

app.get("/", function(request, response){ //root dir
    response.send("Hello!!");l
});

app.listen(port, host);
