var NodeHelper = require("node_helper");
var request = require("request");
var cheerio = require("cheerio");

module.exports = NodeHelper.create({
    socketNotificationReceived: function(notification, payload) {
        if (notification === "GET_MENU") {
            this.getMenu(payload);
        }
    },

    getMenu: function(url) {
        request(url, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(body);
                var menu = this.parseMenu($);
                this.sendSocketNotification("MENU_RESULT", menu);
            } else {
                this.sendSocketNotification("MENU_RESULT", { error: true });
            }
        });
    },

    parseMenu: function($) {
        var menu = { closed: false, items: [] };
        // Hier die Logik zum Parsen des Menüs einfügen
        // ...

        return menu;
    }
});
