// MMM-MensaMenu.js
Module.register("MMM-MensaMenu", {
    defaults: {
        url: "https://www.mensaplan.de/zweibruecken/mensa-zweibruecken/index.html"
    },

    start: function() {
        this.sendSocketNotification("GET_MENU", this.config.url);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "MENU_RESULT") {
            this.menu = payload;
            this.updateDom();
        }
    },

    getDom: function() {
        // Erstellen Sie hier Ihren DOM basierend auf `this.menu`
    }
});
