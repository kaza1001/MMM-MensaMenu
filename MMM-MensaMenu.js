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
    if (!this.food.Monday) {
      wrapper.innerHTML = "Loading menu...";
      wrapper.className = "dimmed light small";
      return wrapper;
    }

    var today = new Date().getDay() - 1; // 0 for Sunday, 1 for Monday, etc.
    var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    var day = days[today];
    if (day) {
      wrapper.innerHTML = `<strong>${day}:</strong><br>${this.food[day]}`;
    } else {
      wrapper.innerHTML = 'Am Wochenende hat die Mensa leider geschlossen! ;)';
    }

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
