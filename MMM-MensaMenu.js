Module.register("MMM-MensaMenu", {
  // Default module config.
  defaults: {
    text: "",
  },

  // Override start method.
  start: function () {
    this.getMensaMenu();
    // Refresh every 10 minutes (adjust as needed).
    setInterval(() => {
      this.getMensaMenu();
    }, 10 * 60 * 1000);
  },

  // Fetch data from the website.
  getMensaMenu: function () {
    // Replace 'YOUR_WEBSITE_URL' with the actual URL of the website you want to scrape.
    fetch('https://www.mensaplan.de/zweibruecken/mensa-zweibruecken/index.html')
      .then(response => response.text())
      .then(data => this.parseMensaMenu(data))
      .catch(error => console.error('Error fetching data:', error));
  },

  // Parse the data and update the module.
  parseMensaMenu: function (html) {
    // Example: Extract information using DOM manipulation.
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Extract menu data for the entire week.
    const days = doc.querySelectorAll('.today th h2');
    const meals = doc.querySelectorAll('.today .primary.meal .description p');

    // Update the module with the parsed data.
    this.updateDomWithMenu(days, meals);
  },

  // Update the module with the menu data.
  updateDomWithMenu: function (days, meals) {
    var wrapper = document.createElement("div");
    wrapper.className = "menu-wrapper";

    // Add the "Der Speiseplan von heute" text at the top.
    var title = document.createElement("div");
    title.className = "menu-title";
    title.innerHTML = "Der Speiseplan für diese Woche";
    wrapper.appendChild(title);

    // Create a table to organize the menu data.
    var table = document.createElement("table");
    table.className = "menu-table";

    // Create table header with day names.
    var headerRow = document.createElement("tr");
    days.forEach(day => {
      var th = document.createElement("th");
      th.innerHTML = day.textContent;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Create table body with meal information.
    var bodyRow = document.createElement("tr");
    meals.forEach(meal => {
      var td = document.createElement("td");
      td.innerHTML = meal.textContent;
      bodyRow.appendChild(td);
    });
    table.appendChild(bodyRow);

    wrapper.appendChild(table);

    // Update the module's text configuration.
    this.config.text = wrapper.innerHTML;
    this.updateDom();
  },

  // Override dom generator.
  getDom: function () {
    var wrapper = document.createElement("div");
    wrapper.innerHTML = this.config.text;
    return wrapper;
  },
});
