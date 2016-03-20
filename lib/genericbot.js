'use strict';

var GenericBot = function Constructor(settings) {
    
};
GenericBot.prototype.sendMessage = function (number, messageText, callback) {
     throw new Error("Not implemented");
};


GenericBot.prototype.receiveMessage = function (number, messageText, callback) {
    // Simple Command:
    if(messageText.match(/^hallo$/i)){
        this.sendMessage(number,"Willkommen beim Pro7Hackathon Botservice!");
    }
    // Get Help
    if(messageText.match(/^help$/i)){
        this.sendMessage(number,"Tippen sie folgende Befehle ein:");
        this.sendMessage(number,"hallo : gibt ein Hallo Zurück");
        this.sendMessage(number,"wetter <ort> : gibt das aktuelle wetter zurück");
        this.sendMessage(number,"fussball : gibt die aktuellen Spiele zurück");
        this.sendMessage(number,"");
    }

    var match =  messageText.match(/^wetter (.+?)$/i);
    if(match){
        var city = match[0];
        this.sendMessage(number,"Das Wetter in "+city+" ist so und so");
        /*
         this.sportradar.querySearch(function (matches) {
         callback(matches);
         })
         */
    }
    /*
    if(callback ){
        callback();
    }
    */
};


module.exports = GenericBot;

