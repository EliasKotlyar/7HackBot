'use strict';



var config = require('../config.json');



var SevenHackBot = require('../lib/sevenhackbot');

var token = config.APIKEY;
var dbPath = "../" + config.DBPATH;
var name = config.NAME;

var norrisbot = new SevenHackBot({
    token: token,
    dbPath: dbPath,
    name: name
});

norrisbot.run();