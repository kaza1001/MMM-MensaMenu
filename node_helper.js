const NodeHelper = require("node_helper");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const cheerio = require("cheerio");

module.exports = NodeHelper.create({
  start: function () {
    console.log("Starting node helper for MMM-MensaMenu");
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "GET_MENU") {
      this.getMenu();
    }
  },

  getMenu: function () {
    var self = this;
    const url = 'https://www.mensaplan.de/zweibruecken/mensa-zweibruecken/index.html';

    fetch(url)
      .then(response => response.text())
      .then(data => {
        const $ = cheerio.load(data);
        const rows = $('table.aw-weekly-menu.aw-group-5 p');

        // Erstellen Sie ein Objekt, das Arrays von Speisen für jeden Wochentag enthält
        const food = {
          Montag: [$(rows[5]).text().trim(), $(rows[10]).text().trim()],
          Dienstag: [$(rows[6]).text().trim(), $(rows[11]).text().trim()],
          Mittwoch: [$(rows[7]).text().trim(), $(rows[12]).text().trim()],
          Donnerstag: [$(rows[8]).text().trim(), $(rows[13]).text().trim()],
          Freitag: [$(rows[9]).text().trim(), $(rows[14]).text().trim()]
        };

        self.sendSocketNotification("MENU_RESULT", food);
      })
      .catch(error => console.error('Error:', error));
  },
});

