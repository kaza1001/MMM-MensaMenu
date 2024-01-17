Module.register("MMM-MensaMenu", {
  defaults: {
    updateInterval: 10 * 60 * 1000, // 10 minutes
  },

  start: function () {
    this.food = {};
    this.getMenu();
    var self = this;
    setInterval(function () {
      self.getMenu();
    }, this.config.updateInterval);
  },

  getStyles: function () {
    return ["MMM-MensaMenu.css"];
  },

  getDom: function () {
    var wrapper = document.createElement("div");
    wrapper.className = "menu-wrapper";

    var title = document.createElement("div");
    title.innerHTML = "HSKL Zweibrücken Mensa-Speiseplan";
    title.className = "menu-title";
    wrapper.appendChild(title);

    var table = document.createElement("table");
    table.className = "menu-table";
    wrapper.appendChild(table);

    var daysRow = table.insertRow();
    var mealsRow1 = table.insertRow();
    var mealsRow2 = table.insertRow();

    var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    // Erste Zeile: Wochentage
    days.forEach(day => {
      var dayCell = daysRow.insertCell();
      dayCell.innerHTML = day;
    });

    // Zweite Zeile: Erstes Essen
    days.forEach(day => {
      var firstMealCell = mealsRow1.insertCell();
      firstMealCell.innerHTML = this.food[day][0]; // Erstes Essen
    });

    // Dritte Zeile: Zweites Essen
    days.forEach(day => {
      var secondMealCell = mealsRow2.insertCell();
      secondMealCell.innerHTML = this.food[day][1]; // Zweites Essen
    });

    return wrapper;
  },

  getMenu: function () {
    this.sendSocketNotification("GET_MENU");
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "MENU_RESULT") {
      this.food = payload;
      this.updateDom();
    }
  },
});

