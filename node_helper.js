const NodeHelper = require("node_helper");
const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = NodeHelper.create({
  start: function () {
    console.log("Starting node helper for MMM-MensaMenu");
  },
  socketNotificationReceived: function (notification, payload) {
    if (notification === "GET_FOOD") {
      this.getFood();
    }
  },
  getFood: function () {
    const self = this;
    const url = 'https://www.mensaplan.de/zweibruecken/mensa-zweibruecken/index.html';
    fetch(url)
      .then(response => response.text())
      .then(data => {
        const $ = cheerio.load(data);
        const rows = $('table.aw-weekly-menu.aw-group-5 p');

        const food = {
          Monday: `${$(rows[5]).text().trim()} ${$(rows[10]).text().trim()}`,
          Tuesday: `${$(rows[6]).text().trim()} ${$(rows[11]).text().trim()}`,
          Wednesday: `${$(rows[7]).text().trim()} ${$(rows[12]).text().trim()}`,
          Thursday: `${$(rows[8]).text().trim()} ${$(rows[13]).text().trim()}`,
          Friday: `${$(rows[9]).text().trim()} ${$(rows[14]).text().trim()}`
        };

        const currentdate = new Date().getDay() - 1; // 0 for Sunday, 1 for Monday, etc.
        let currentFood = '';

        switch (currentdate) {
          case 0:
            currentFood = `Montag:\n${food.Monday}`;
            break;
          case 1:
            currentFood = `Dienstag:\n${food.Tuesday}`;
            break;
          case 2:
            currentFood = `Mittwoch:\n${food.Wednesday}`;
            break;
          case 3:
            currentFood = `Donnerstag:\n${food.Thursday}`;
            break;
          case 4:
            currentFood = `Freitag:\n${food.Friday}`;
            break;
          default:
            currentFood = 'Am Wochenende hat die Mensa leider geschlossen! ;)';
        }

        self.sendSocketNotification("FOOD_RESULT", currentFood);
      })
      .catch(function (error) {
        console.error("Error fetching food: " + error.message);
      });
  }
});
