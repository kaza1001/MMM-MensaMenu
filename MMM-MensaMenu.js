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
    wrapper.className = "small";

    var headerRow = document.createElement("tr");
    var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    days.forEach(day => {
      var headerCell = document.createElement("th");
      headerCell.innerHTML = day;
      headerRow.appendChild(headerCell);
    });
    wrapper.appendChild(headerRow);

    var food1Row = document.createElement("tr");
    days.forEach(day => {
      var food1Cell = document.createElement("td");
      food1Cell.innerHTML = this.food[day] ? this.food[day].split(" ")[0] : "";
      food1Row.appendChild(food1Cell);
    });
    wrapper.appendChild(food1Row);

    var food2Row = document.createElement("tr");
    days.forEach(day => {
      var food2Cell = document.createElement("td");
      food2Cell.innerHTML = this.food[day] ? this.food[day].split(" ")[1] : "";
      food2Row.appendChild(food2Cell);
    });
    wrapper.appendChild(food2Row);

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
