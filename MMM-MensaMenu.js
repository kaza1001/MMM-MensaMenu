
let essen = "<p>Donerstag</p> <p>Essen1</p>"



Module.register("MMM-MensaMenu", {


    getDom: function () {
      var wrapper = document.createElement("div");
      wrapper.innerHTML = essen;
      return wrapper;
    },
    getHeader: function(){
      return "Heutiger Spieseplan"
    }

  });

