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
    if (!this.food.Monday) {
      table.innerHTML = "Loading menu...";
      table.className = "dimmed light small";
      wrapper.appendChild(table);
      return wrapper;
    }

    var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    days.forEach(day => {
      var dayRow = table.insertRow();
      var cell = dayRow.insertCell();
      cell.innerHTML = day;

      this.food[day].forEach(meal => {
        var mealRow = table.insertRow();
        cell = mealRow.insertCell();
        cell.innerHTML = meal;
      });
    });

    wrapper.appendChild(table);
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
