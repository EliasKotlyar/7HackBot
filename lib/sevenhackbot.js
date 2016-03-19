'use strict';

var util = require('util');
var path = require('path');
var fs = require('fs');

var Bot = require('slackbots');

/**
 * Constructor function. It accepts a settings object which should contain the following keys:
 *      token : the API token of the bot (mandatory)
 *      name : the name of the bot (will default to "sevenhackbot")
 *      dbPath : the path to access the database (will default to "data/sevenhackbot.db")
 *
 * @param {object} settings
 * @constructor
 *
 * @author Luciano Mammino <lucianomammino@gmail.com>
 */
var SevenHackBot = function Constructor(settings) {
    this.settings = settings;
    this.settings.name = this.settings.name || 'sevenhackbot';
    this.dbPath = settings.dbPath || path.resolve(__dirname, '..', 'data', 'sevenhackbot.db');

    this.user = null;
    this.db = null;
};

// inherits methods and properties from the Bot constructor
util.inherits(SevenHackBot, Bot);

/**
 * Run the bot
 * @public
 */
SevenHackBot.prototype.run = function () {
    SevenHackBot.super_.call(this, this.settings);

    this.on('start', this._onStart);
    this.on('message', this._onMessage);
};

/**
 * On Start callback, called when the bot connects to the Slack server and access the channel
 * @private
 */
SevenHackBot.prototype._onStart = function () {
    this._loadBotUser();
};

/**
 * On message callback, called when a message (of any type) is detected with the real time messaging API
 * @param {object} message
 * @private
 */
SevenHackBot.prototype._onMessage = function (message) {

    var self = this;

    //console.log(message);
    if (this._isChatMessage(message) &&
        this._isChannelConversation(message)&&
        !this._isFromNorrisBot(message)
    ) {
        //console.log(message);
        this._processMessage(message.text,function (messageText){
            var channel = self._getChannelById(message.channel);
            self.postMessageToChannel(channel.name, messageText, {as_user: true});

        })
    }
};

SevenHackBot.prototype._processMessage = function (messageText,callback) {
    if(messageText.match(/^hallo$/i)){
        callback("Hallo DU!");
    }
    //callback(messageText);


};



/**
 * Loads the user object representing the bot
 * @private
 */
SevenHackBot.prototype._loadBotUser = function () {
    var self = this;
    //console.log(this.name);
    this.user = this.users.filter(function (user) {
        //console.log(user);
        return user.name === self.name;
    })[0];

    //console.log(this.user);

};







/**
 * Util function to check if a given real time message object represents a chat message
 * @param {object} message
 * @returns {boolean}
 * @private
 */
SevenHackBot.prototype._isChatMessage = function (message) {
    return message.type === 'message' && Boolean(message.text);
};

/**
 * Util function to check if a given real time message object is directed to a channel
 * @param {object} message
 * @returns {boolean}
 * @private
 */
SevenHackBot.prototype._isChannelConversation = function (message) {
    return typeof message.channel === 'string' &&
        message.channel[0] === 'C'
        ;
};

/**
 * Util function to check if a given real time message is mentioning Chuck Norris or the sevenhackbot
 * @param {object} message
 * @returns {boolean}
 * @private
 */
SevenHackBot.prototype._isMentioningChuckNorris = function (message) {
    return message.text.toLowerCase().indexOf('chuck norris') > -1 ||
        message.text.toLowerCase().indexOf(this.name) > -1;
};

/**
 * Util function to check if a given real time message has ben sent by the sevenhackbot
 * @param {object} message
 * @returns {boolean}
 * @private
 */
SevenHackBot.prototype._isFromNorrisBot = function (message) {
    return message.user === this.user.id;
};

/**
 * Util function to get the name of a channel given its id
 * @param {string} channelId
 * @returns {Object}
 * @private
 */
SevenHackBot.prototype._getChannelById = function (channelId) {
    return this.channels.filter(function (item) {
        return item.id === channelId;
    })[0];
};

module.exports = SevenHackBot;
