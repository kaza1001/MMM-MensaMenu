Module.register("MMM-MensaMenu", {
  // Default module config.
  defaults: {
    text: "Du stinkst!",
  },

  // Override dom generator.
  getDom: function () {
    var wrapper = document.createElement("div");
    wrapper.innerHTML = this.config.text;
    return wrapper;
  },
});