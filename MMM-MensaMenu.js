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
      foodOfTheDay = "<h4>Dienstag</h4>" + "<p>" + Food1Tuesday + "</p>" + "<p>" + Food2Tuesday + "</p>";
    } else if (currentdate === 3) {
      foodOfTheDay = "<h4>Mittwoch</h4>" + "<p>" + Food1Wednesday + "</p>" + "<p>" + Food2Wednesday + "</p>";
      console.log(`Mittwoch:\n${Food1Wednesday}\n${Food2Wednesday}`);
    } else if (currentdate === 4) {
      foodOfTheDay = "<h4>Donnerstag</h4>" + "<p>" + Food1Thursday + "</p>" + "<p>" + Food2Thursday + "</p>";
      console.log(`Donnerstag:\n${Food1Thursday}\n${Food2Thursday}`);
    } else if (currentdate === 5) {
      foodOfTheDay = "<h4>Freitag</h4>" + "<p>" + Food1Friday + "</p>" + "<p>" + Food2Friday + "</p>";
      console.log(`Freitag:\n${Food1Friday}\n${Food2Friday}`);
    } else {
      foodOfTheDay= "Am Wochenende hat die Mensa leider geschlossen! ;)";
      console.log('Am Wochenende hat die Mensa leider geschlossen! ;)');
    }
  })
  .catch((error) => {
    console.error(`Error fetching data: ${error.message}`);
  });

