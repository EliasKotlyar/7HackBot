'use strict';


var Erricson = function Constructor(settings) {
    this.apiKey = settings.key;
};

Erricson.apiKey = "";


var request = require('request');
Erricson.prototype.querySearch = function (searchTerm,callback) {
    var self = this;
    var url = "http://hack.api.uat.ebmsctogroup.com/stores-active/contentInstance/event/search?query="+searchTerm + "&numberOfResults=100&api_key="+this.apiKey;
    console.log(url);
    request(url, function (err, response, body) {
        self.parse(body,callback);
    });
};
Erricson.prototype.parse = function (json,callback) {
    var obj = JSON.parse(json);
    console.log(obj[0]["document"]["internalIds"]);
    var seriesId = obj[0]["document"]["internalIds"]["sourceId"];
    //var seriesId = obj[0]["document"]["internalIds"]["seriesId"];
    callback(seriesId);
};



module.exports = Erricson;





