const axios = require('axios');
const cheerio = require('cheerio');
let foodOfTheDay = "";

const currentdate = new Date().getDay();  // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
const url = 'https://www.mensaplan.de/zweibruecken/mensa-zweibruecken/index.html';

axios.get(url)
  .then((response) => {
    const $ = cheerio.load(response.data);
    const rows = $('.aw-weekly-menu.aw-group-5 p');

    const Food1Monday = rows.eq(5).text().trim();
    const Food2Monday = rows.eq(10).text().trim();
    const Food1Tuesday = rows.eq(6).text().trim();
    const Food2Tuesday = rows.eq(11).text().trim();
    const Food1Wednesday = rows.eq(7).text().trim();
    const Food2Wednesday = rows.eq(12).text().trim();
    const Food1Thursday = rows.eq(8).text().trim();
    const Food2Thursday = rows.eq(13).text().trim();
    const Food1Friday = rows.eq(9).text().trim();
    const Food2Friday = rows.eq(14).text().trim();

    if (currentdate === 1) {
      foodOfTheDay = "<h4>Montag</h4>" + "<p>" + Food1Monday + "</p>" + "<p>" + Food2Monday + "</p>";
      console.log(`Montag:\n${Food1Monday}\n${Food2Monday}`);
    } else if (currentdate === 2) {
      foodOfTheDay = "<h4>Montag</h4>" + "<p>" + Food1Tuesday + "</p>" + "<p>" + FoodTuesday + "</p>";
    } else if (currentdate === 3) {
      console.log(`Mittwoch:\n${Food1Wednesday}\n${Food2Wednesday}`);
    } else if (currentdate === 4) {
      foodOfTheDay = "<h4>Donnerstag</h4>" + "<p>" + Food1Thursday + "</p>" + "<p>" + Food2Thursday + "</p>";
      console.log(`Donnerstag:\n${Food1Thursday}\n${Food2Thursday}`);
    } else if (currentdate === 5) {
      console.log(`Freitag:\n${Food1Friday}\n${Food2Friday}`);
    } else {
      console.log('Am Wochenende hat die Mensa leider geschlossen! ;)');
    }
  })
  .catch((error) => {
    console.error(`Error fetching data: ${error.message}`);
  });




  Module.register("MMM-MensaMenu", {


    getDom: function () {
      var wrapper = document.createElement("div");
      wrapper.innerHTML = foodOfTheDay;
      return wrapper;
    },
    getHeader: function(){
      return "Heutiger Spieseplan"
    }

  });

