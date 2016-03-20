'use strict';

var Whatzapp = function Constructor(settings) {
    this.bs = require('nodestalker');
    this.host = settings.host;
    this.receiveTube = "whatsapp-receive";
    this.sendTube = "whatsapp-send";
};
Whatzapp.prototype.receiveMessage = function (callback) {
    var self = this;
    var client = this.bs.Client(this.host);
    client.watch(this.receiveTube).onSuccess(function (data) {

        client.reserve().onSuccess(function (job) {
            //console.log('reserved', job);


            client.deleteJob(job.id).onSuccess(function (del_msg) {
                //console.log('deleted', job);
                //console.log('message', del_msg);
                var obj = JSON.parse(job.data);
                var messageText = obj.body;
                var sender = obj.sender;
                client.disconnect();
                callback(sender,messageText);
                //console.log(obj);



            });

        });
    });



};

Whatzapp.prototype.sendMessage = function (toAddress,messageText) {
    var client = this.bs.Client(this.host);
    var self = this;
    var obj = {
        "type":"simple","body":messageText,"address":toAddress
    };
    obj = JSON.stringify(obj);

    client.use(self.sendTube).onSuccess(function(data) {
        console.log(data);

        client.put(obj).onSuccess(function(data) {
            console.log(data);
            client.disconnect();
        });
    });




};

Whatzapp.prototype._processMessage = function (number,messageText,callback) {
    if(messageText.match(/^hallo$/i)){
        callback("Willkommen beim Pro7Hackathon Botservice!");
    }
    if(messageText.match(/^wetter (.+?)$/i)){
        /*
        this.sportradar.querySearch(function (matches) {
            callback(matches);
        })
        */
    }

    //callback(messageText);


};
Whatzapp.prototype.run = function () {
    this.receiveMessage(function (sender,message) {

    });
};

module.exports = Whatzapp;


