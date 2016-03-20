'use strict';
var path = require('path');
var fs = require('fs');
var GenericBot = function Constructor(settings) {
    this.sportRadar = settings.sportradar;
    this.wetter = settings.wetter;


};
GenericBot.prototype.sendMessage = function (number, messageText, callback) {
    throw new Error("Not implemented");
};


GenericBot.prototype.receiveMessage = function (number, messageText, callback) {
    var self = this;
    // Simple Command:
    if (messageText.match(/^hallo$/i)) {
        this.sendMessage(number, "Welcome to the 7Play Bot - your companion for all the soccer games in Europe!");
    }
    // Get Help
    if (messageText.match(/^help$/i)) {

        this.sendMessage(number, "" +
            'That is how you use the bot: \n' +
            'type "Fussball" to get the overview of the upcoming games in Europe.\n' +
            'Type "Wetter " to get the latest weather in the city where the game takes place. '+
            'For Example "Wetter Munich"'
        );

    }

    var match = messageText.match(/^wetter (.+?)$/i);
    if (match) {
        var city = match[0];
        self.wetter.querySearch(city, function (matches) {
            self.sendMessage(number, "Die Voraussage vom Wetter in " + city + " lautet:\n" + matches.join('\n'));
        });

        /*
         this.sportradar.querySearch(function (matches) {
         callback(matches);
         })
         */
    }
    var match = messageText.match(/^fussball$/i);
    if (match) {

        self.sportRadar.querySearch(function (matches) {
            //console.log(matches)
            if (matches.length > 0) {
                self.sendMessage(number, matches.join('\n'));
            } else {
                self.sportRadar.provideSampleFile(function (matches) {
                    //console.log(matches.join('\n'));
                    self.sendMessage(number, matches.join('\n'));
                });
            }
        });
    }
};


module.exports = GenericBot;

