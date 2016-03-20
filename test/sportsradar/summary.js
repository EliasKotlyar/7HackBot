'use strict';
var fs = require('fs');
var SportsRadar = require('../../lib/sportsradar') ;

//GenericBot.querySearch();

fs.readFile('summary1.txt', 'utf8',function (err,data) {
    if (err) {
        return console.log(err);
    }
    SportsRadar.parseMatchDetails(data,function(matches){
        //console.log(matches);



        fs.readFile('summary2.txt', 'utf8',function (err,data) {
            if (err) {
                return console.log(err);
            }
            SportsRadar.parseMatchDetails(data,function(matches){
                //console.log(matches);

            });
        });

        
    });
});



