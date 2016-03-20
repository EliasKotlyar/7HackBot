'use strict';

var path = require('path');
var SevenHackBot = require('../lib/sevenhackbot');
var config = require('../config.json');
var SevenDataBase = require('../lib/database');
var SevenWebserver = require('../lib/webserver');
var SportRadar = require('../lib/sportsradar');
var Whatzapp = require('../lib/whatzapp');
var GenericBot = require('../lib/genericbot');

var Wetter = require('../lib/wetter');
var wetter = new Wetter({key:"240e4458fc4c6ac85c290481646b21ef"});

// Start DB
/*
 var database = new SevenDataBase({
 path: dbPath
 });
 */
var sportradar =  new SportRadar({
    "apiKey" :config.SPORTRADAR_KEY,
    "sampleFile" : "../test/sportsradar/schedule.txt"
});


var genericBot = new GenericBot({
    'sportradar' : sportradar,
    'wetter' : wetter
});

var whatzapp = new Whatzapp({
    'host': config.WHATZAPP_HOST,
    'genericBot' : genericBot
});
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
 var token = config.APIKEY;
 //var dbPath = path.resolve(process.cwd(), "data",config.DBPATH);
 var botName = config.NAME;

 var sevenhackbot = new SevenHackBot({
 token: token,
 db: database,
 name: botName,
 sportradar:sportradar
 });


 sevenhackbot.run();
 */





