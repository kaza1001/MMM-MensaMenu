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

        const food = {
          Monday: [$(rows[5]).text().trim(), $(rows[10]).text().trim()],
          Tuesday: [$(rows[6]).text().trim(), $(rows[11]).text().trim()],
          Wednesday: [$(rows[7]).text().trim(), $(rows[12]).text().trim()],
          Thursday: [$(rows[8]).text().trim(), $(rows[13]).text().trim()],
          Friday: [$(rows[9]).text().trim(), $(rows[14]).text().trim()]
        };

        self.sendSocketNotification("MENU_RESULT", food);
      })
      .catch(error => console.error('Error:', error));
  },
});

