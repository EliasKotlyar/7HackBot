var whatzapp = new Whatzapp({'host': 'twinsen.de:11300'});
whatzapp.receiveMessage(function (message) {
    console.log(message);
    whatzapp.receiveMessage(function (message) {
        console.log(message);
    });

});
//whatzapp.sendMessage("4917656878023@s.whatsapp.net","Test Message!");