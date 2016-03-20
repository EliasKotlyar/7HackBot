'use strict';

var parseString = require('xml2js').parseString;
var path = require('path');
var fs = require('fs');

var uniq = require("uniq");
var SportsRadar = function Constructor(settings) {
    //this.db = settings.db;
    this.apiKey = settings.apiKey;
    this.sampleFile = settings.sampleFile;
};
var request = require('request');
SportsRadar.apiKey = "";


SportsRadar.prototype.querySearch = function (callback) {
    var self = this;
    var url = "http://api.sportradar.us/soccer-t2/eu/matches/2016/03/20/schedule.xml?api_key=" + this.apiKey;
    request(url, function (err, response, body) {
        self.parseShedule(body, callback);
    });
};
SportsRadar.prototype.parseShedule = function (xml, callback) {
    parseString(xml, function (err, result) {
        if (err) {
            return console.log(err);
        }
        var matches = [];
        result["schedule"]["matches"][0]["match"].forEach(function (value, index) {
            if (value["$"]["status"] == "inprogress") {
                var country = value["category"][0]["$"]["name"];
                var home = value["home"][0]["$"]["name"];
                var away = value["away"][0]["$"]["name"];
                var id = value["$"]["id"];
                var text = country + ": " + home + "  VS " + away;
                var obj = {
                    'id': id,
                    'text': text
                };
                matches.push(text);
            }

        });
        callback(matches);

    });
};
SportsRadar.getCurrentRunningMatches = function (callback) {
    SportsRadar.querySearch(callback)
};

SportsRadar.getMatchDetails = function (matchID, callback) {
    var url = "http://api.sportradar.us/soccer-t2/eu/matches/" + matchID + "/summary.xml?api_key=" + this.apiKey
    request(url, function (err, response, body) {
        SportsRadar.parseMatchDetails(body, callback);
    });

};
SportsRadar.matchDetails = [];

SportsRadar.parseMatchDetails = function (xml, callback) {
    parseString(xml, function (err, result) {
        if (err) {
            return console.log(err);
        }
        console.log(SportsRadar.matchDetails);
        var matches = [];
        result["summary"]["matches"][0]["match"][0]["facts"][0]["fact"].forEach(function (value, index) {
            //console.log(value);
            //var id = ["id"];
            var id = value["$"] ? value["$"]["id"] : undefined;
            var description = value["description"] ? value["description"][0] : undefined;


            if (id && description) {
                //console.log(id,description);

                var obj = {
                    "id": id,
                    "description": description
                };
                //this.db.getRecords("SELECT * FROM sportradar",function )
                matches.push(description.toString());

            }


        });


        callback(matches);


    });
};

SportsRadar.prototype.provideSampleFile = function ( callback) {
    var self = this;
    fs.readFile(this.sampleFile, 'utf8',function (err,data) {
        if (err) {
            return console.log(err);
        }
        self.parseShedule(data,function(matches){
            callback(matches);
        });
    });
};


module.exports = SportsRadar;


