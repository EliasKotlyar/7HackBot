'use strict';

var path = require('path');
var SevenHackBot = require('../lib/sevenhackbot');
var config = require('../config.json');
var SevenDataBase = require('../lib/database');
var SevenWebserver = require('../lib/webserver');





var token = config.APIKEY;
var dbPath = path.resolve(process.cwd(), "data",config.DBPATH);
var botName = config.NAME;

// Start DB
var database = new SevenDataBase({
    path: dbPath
});

// Start Webserver
var sevenwebserver = new SevenWebserver({

});


// Start Bot

var sevenhackbot = new SevenHackBot({
    token: token,
    db: database,
    name: botName
});

sevenhackbot.run();




