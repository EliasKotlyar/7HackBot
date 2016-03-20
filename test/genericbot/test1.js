'use strict';
var fs = require('fs');
var GenericBot = require('../../lib/genericbot');
var genericBot = new GenericBot({});

genericBot.sendMessage = function (number,message,callback) {
  console.log(number+" : "+ message);
};
var number = "01377";
var message = "help";


genericBot.receiveMessage(number,message);
message = "hallo";
genericBot.receiveMessage(number,message);

message = "wetter münchen";

genericBot.receiveMessage(number,message);