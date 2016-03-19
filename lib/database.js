'use strict';
var SQLite = require('sqlite3').verbose();
var fs = require('fs');


var SevenDataBase = function Constructor(settings) {
    this.dbPath = settings.path;
    if (!fs.existsSync(this.dbPath)) {
        console.error('SevenDataBase path ' + '"' + this.dbPath + '" does not exists or it\'s not readable.');
        process.exit(1);
    }

    this.db = new SQLite.Database(this.dbPath);
};

SevenDataBase.getRecords = function (sql, callback) {
    self.db.get('SELECT val FROM info WHERE name = "lastrun" LIMIT 1', function (err, record) {
        if (err) {
            return console.error('DATABASE ERROR:', err);
        }
    });
};



SevenDataBase.getRecords = function (sql, callback) {
    self.db.run(sql);

};




module.exports = SevenDataBase;
