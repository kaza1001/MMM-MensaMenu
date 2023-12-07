Module.register("MMM-MensaMenu", {
    // Default module config.
    defaults: {
      text: abc,
    },
  
    // Override dom generator.
    getDom: function () {
      var wrapper = document.createElement("div");
      wrapper.innerHTML = this.config.text;
      return wrapper;
    },
  });

  const abc = "<p>Hallo</p><p>Ciao</p>"