'use strict';

var path = require('path');
var SevenHackBot = require('../lib/sevenhackbot');
var config = require('../config.json');
var SevenDataBase = require('../lib/database');
var SevenWebserver = require('../lib/webserver');
var SportRadar = require('../lib/sportsradar');
var Whatzapp = require('../lib/whatzapp');


var token = config.APIKEY;
//var dbPath = path.resolve(process.cwd(), "data",config.DBPATH);
var botName = config.NAME;

// Start DB
/*
 var database = new SevenDataBase({
 path: dbPath
 });
 */
var whatzapp = new Whatzapp({'host': config.WHATZAPP_HOST});
whatzapp.run();

// Start Webserver
var sevenwebserver = new SevenWebserver({
    'whatzapp': whatzapp,
    'host': config.WEBSERVER_HOST,
    'port': config.WEBSERVER_PORT
});
sevenwebserver.startUp();
// Start Sportradar


//whatzapp.sendMessage("4917656878023@s.whatsapp.net","Test Message!");


// Start Bot
/*
 var sportradar =  new SportRadar({
 });
 var sevenhackbot = new SevenHackBot({
 token: token,
 db: database,
 name: botName,
 sportradar:sportradar
 });


 sevenhackbot.run();
 */





