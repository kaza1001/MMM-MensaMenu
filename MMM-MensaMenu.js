Module.register("MMM-MensaMenu", {
    defaults: {
        updateInterval: 60 * 60 * 1000, // Alle Stunde aktualisieren
        url: "https://www.mensaplan.de/zweibruecken/mensa-zweibruecken/index.html",
    },

    start: function () {
        this.scheduleUpdate();
    },

    scheduleUpdate: function () {
        setInterval(() => {
            this.getData();
        }, this.config.updateInterval);
        this.getData();
    },

    getData: function () {
        const self = this;
        const url = this.config.url;
        fetch(url)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");
                const table = doc.querySelector(".aw-weekly-menu.aw-group-5");
                const rows = table.querySelectorAll("p");

                self.food1Monday = " ".join(rows[5].textContent.split());
                self.food2Monday = " ".join(rows[10].textContent.split());
                self.food1Tuesday = " ".join(rows[6].textContent.split());
                self.food2Tuesday = " ".join(rows[11].textContent.split());
                self.food1Wednesday = " ".join(rows[7].textContent.split());
                self.food2Wednesday = " ".join(rows[12].textContent.split());
                self.food1Thursday = " ".join(rows[8].textContent.split());
                self.food2Thursday = " ".join(rows[13].textContent.split());
                self.food1Friday = " ".join(rows[9].textContent.split());
                self.food2Friday = " ".join(rows[14].textContent.split());

                self.updateDom();
            })
            .catch(error => {
                Log.error(`MMM-MensaMenu: Fehler beim Abrufen der Daten: ${error}`);
            });
    },

    getDom: function () {
        const wrapper = document.createElement("div");

        if (currentdate === 0) {
            this.addFoodToDom(wrapper, this.food1Monday, this.food2Monday, "Montag");
        } else if (currentdate === 1) {
            this.addFoodToDom(wrapper, this.food1Tuesday, this.food2Tuesday, "Dienstag");
        } else if (currentdate === 2) {
            this.addFoodToDom(wrapper, this.food1Wednesday, this.food2Wednesday, "Mittwoch");
        } else if (currentdate === 3) {
            this.addFoodToDom(wrapper, this.food1Thursday, this.food2Thursday, "Donnerstag");
        } else if (currentdate === 4) {
            this.addFoodToDom(wrapper, this.food1Friday, this.food2Friday, "Freitag");
        } else {
            wrapper.innerHTML = "Am Wochenende hat die Mensa leider geschlossen! ;)";
        }

        return wrapper;
    },

    addFoodToDom: function (wrapper, food1, food2, day) {
        const header = document.createElement("h2");
        header.innerText = day;
        wrapper.appendChild(header);

        const food1Element = document.createElement("p");
        food1Element.innerText = `Food 1: ${food1}`;
        wrapper.appendChild(food1Element);

        const food2Element = document.createElement("p");
        food2Element.innerText = `Food 2: ${food2}`;
        wrapper.appendChild(food2Element);
    }
});