'use strict';

var Whatzapp = function Constructor(settings) {
    this.bs = require('nodestalker');
    this.host = settings.host;
    this.receiveTube = "whatsapp-receive";
    this.sendTube = "whatsapp-send";
    this.genericBot = settings.genericBot;
    this.genericBot.sendMessage = this.sendMessage.bind(this);
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
                console.log(obj);
                var messageText = obj.body;
                var sender = obj.address;
                client.disconnect();

                callback(sender,messageText);
                //console.log(obj);
                self.run();



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
    var resString = JSON.stringify(obj);

    var encoding = require("encoding");
    var resultBuffer = encoding.convert(resString, "ASCII", "UTF-8");
    //console.log(resultBuffer);
    client.use(self.sendTube).onSuccess(function(data) {
        console.log(data);

        client.put(resultBuffer).onSuccess(function(data) {
            console.log(data);
            client.disconnect();
        });
    });




};


Whatzapp.prototype.run = function () {
    var self = this;
    this.receiveMessage(function (sender,message) {
        self.genericBot.receiveMessage(sender,message);
    });
};

module.exports = Whatzapp;


