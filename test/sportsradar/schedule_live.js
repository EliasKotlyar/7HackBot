'use strict';
var fs = require('fs');
var SportsRadar = require('../../lib/sportsradar');


SportsRadar.querySearch(function (matches) {
    console.log(matches)
});
