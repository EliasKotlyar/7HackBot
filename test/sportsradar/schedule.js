'use strict';
var fs = require('fs');
var SportsRadar = require('../../lib/sportsradar') ;

//GenericBot.querySearch();

fs.readFile('schedule.txt', 'utf8',function (err,data) {
    if (err) {
        return console.log(err);
    }
    SportsRadar.parseShedule(data,function(matches){
        console.log(matches)
    });
});
