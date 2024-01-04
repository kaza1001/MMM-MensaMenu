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
                var menu = [];
                // Füllen Sie das `menu` Array basierend auf der gescrapten HTML-Struktur
                this.sendSocketNotification("MENU_RESULT", menu);
            }
        });
    }
});
