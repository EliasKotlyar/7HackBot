'use strict';
var fs = require('fs');
var SportsRadar = require('../../lib/sportsradar');
SportsRadar.apiKey = "2dvtaz23cq6prqjqe8zhahzk";

SportsRadar.querySearch(function (matches) {
    console.log(matches)
});
