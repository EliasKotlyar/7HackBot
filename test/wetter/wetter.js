'use strict';
var fs = require('fs');
var Wetter = require('../../lib/wetter');
var wetter = new Wetter({key:"240e4458fc4c6ac85c290481646b21ef"});

var searchTerm = "Muenchen";
wetter.querySearch(searchTerm, function (seriesId) {
    console.log(seriesId)
});
