Module.register("MMM-MensaMenu", {
    defaults: {
        url: "https://www.mensaplan.de/zweibruecken/mensa-zweibruecken/index.html"
    },

    start: function() {
        this.menu = null;
        this.sendSocketNotification("GET_MENU", this.config.url);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "MENU_RESULT") {
            this.menu = payload;
            this.updateDom();
        }
    },

    getDom: function() {
        var wrapper = document.createElement("div");
        if (this.menu) {
            var table = document.createElement("table");
            var header = document.createElement("header");
            header.innerHTML = "Mensaspeiseplan";
            wrapper.appendChild(header);

            var today = new Date().getDay();
            if (today === 6) { // Samstag
                wrapper.innerHTML = "Die Mensa ist am Samstag geschlossen.";
                return wrapper;
            }

            if (this.menu.closed) {
                wrapper.innerHTML = "Die Mensa ist geschlossen.";
                return wrapper;
            }

            // Hier die Tabelle mit dem Menü aufbauen
            // ...

            wrapper.appendChild(table);
        } else {
            wrapper.innerHTML = "Lade Menü...";
        }
        return wrapper;
    }
});
