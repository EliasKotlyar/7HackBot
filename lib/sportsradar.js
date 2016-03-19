'use strict';

var parseString = require('xml2js').parseString;


var uniq = require("uniq");
var SportsRadar = function Constructor(settings) {

};
var request = require('request');
SportsRadar.apiKey = "2dvtaz23cq6prqjqe8zhahzk";


SportsRadar.getShedule = function (message,callback) {
    var url = "http://api.sportradar.us/soccer-t2/eu/matches/2016/03/19/schedule.xml?api_key="+this.apiKey;
    request(url, function (err, response, body) {
        SportsRadar.parseShedule(body,callback);
    });
};
SportsRadar.parseShedule = function (xml,callback) {
    parseString(xml, function (err, result) {
        if (err) {
            return console.log(err);
        }
        var matches = [];
        result["schedule"]["matches"][0]["match"].forEach(function (value, index) {
            if(value["$"]["status"]=="inprogress"){
                matches.push(value["$"]["id"]);
            }

        });
        callback(matches);

    });
};
SportsRadar.getCurrentRunningMatches = function (callback) {
    SportsRadar.getShedule(callback)
};

SportsRadar.getMatchDetails = function (matchID,details) {
    "http://api.sportradar.us/soccer-t2/eu/matches/"+matchID+"/summary.xml?api_key="+this.apiKey
    request(url, function (err, response, body) {
        SportsRadar.parseMatchDetails(body,callback);
    });
    
};
SportsRadar.matchDetails = [];

SportsRadar.parseMatchDetails = function (xml,callback) {
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


             if(id && description){
                //console.log(id,description);

                 var obj = {
                     "id" : id,
                     "description" : description
                 };

             }


        });





        callback(matches);


    });
};

    


module.exports = SportsRadar;


