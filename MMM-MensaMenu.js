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
    var wrapper = document.createElement("table");
    wrapper.className = "menu-table";
    if (!this.food.Monday) {
      wrapper.innerHTML = "Loading menu...";
      wrapper.className = "dimmed light small";
      return wrapper;
    }

    var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    var menuRow = wrapper.insertRow();
    var daysRow = wrapper.insertRow();

    days.forEach(day => {
      var cell = daysRow.insertCell();
      cell.innerHTML = day;

      cell = menuRow.insertCell();
      cell.innerHTML = this.food[day];
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

