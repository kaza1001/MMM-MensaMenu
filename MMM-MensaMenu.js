/* MMM-MensaMenu.js */
Module.register("MMM-MensaMenu", {
  defaults: {
    updateInterval: 60 * 60 * 1000, // 1 hour
  },

  start: function () {
    this.food = "";
    this.getFood();
    var self = this;
    setInterval(function () {
      self.getFood();
    }, this.config.updateInterval);
  },

  getStyles: function () {
    return ["MMM-MensaMenu.css"];
  },

  getDom: function () {
    var wrapper = document.createElement("div");
    wrapper.className = "mense-menu";
    wrapper.innerHTML = this.food;
    return wrapper;
  },

  getFood: function () {
    this.sendSocketNotification("GET_FOOD");
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "FOOD_RESULT") {
      this.food = payload;
      this.updateDom();
    }
  },
});
