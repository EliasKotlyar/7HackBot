'use strict';


var Wetter = function Constructor(settings) {
    this.apiKey = settings.key;
};

Wetter.apiKey = "";


var request = require('request');
Wetter.prototype.querySearch = function (searchTerm, callback) {
    var self = this;
    var username = "7hack";
    var password = "hacktheweather";
    var checksumString = username + password + searchTerm;
    var crypto = require('crypto');
    var checksum = crypto.createHash('md5').update(checksumString).digest('hex');
    var url = "http://rwds2.wetter.com/location/index/search/" + searchTerm + "/user/" + username + "/cs/" + checksum;


    //console.log(url);
    request(url, function (err, response, body) {
        self.parseCityCode(body, callback);
    });
};
Wetter.prototype.foreCast = function (cityCode, callback) {
    var self = this;
    var username = "7hack";
    var password = "hacktheweather";
    var checksumString = username + password + cityCode;
    var crypto = require('crypto');
    var checksum = crypto.createHash('md5').update(checksumString).digest('hex');
    var url = "http://rwds2.wetter.com/forecast/weather/city/" + cityCode + "/user/" + username + "/cs/" + checksum;


    //console.log(url);
    request(url, function (err, response, body) {
        self.parseForeCast(body, callback);
    });
};

Wetter.prototype.parseCityCode = function (json, callback) {
    var obj = JSON.parse(json);
    var cityCode = obj["search"]["result"][0]["city_code"];
    this.foreCast(cityCode, callback);


};

Wetter.prototype.parseForeCast = function (json, callback) {
    var obj = JSON.parse(json);
    //console.log(obj["city"]["forecast"]["2016-03-20"]);
    var matches = [];
    obj =  obj["city"]["forecast"]["2016-03-20"];
    for (var key in obj) {
        var value = obj[key];
        if (value.hasOwnProperty('w_txt')){
            //console.log(key);
            var text = key + ": " + value['w_txt'];
            matches.push(text);
        }
    }
    callback(matches);



};

module.exports = Wetter;





