import {BeautifulSoup} from 'bs4';
import {datetime} from 'datetime';
import * as requests from 'requests';
var Food1Friday, Food1Monday, Food1Thursday, Food1Tuesday, Food1Wednesday, Food2Friday, Food2Monday, Food2Thursday, Food2Tuesday, Food2Wednesday, currentdate, page, rows, soup, table, url;
currentdate = datetime.today().weekday();
url = `https://www.mensaplan.de/zweibruecken/mensa-zweibruecken/index.html`;
page = requests.get(url);
soup = new BeautifulSoup(page.content, "html.parser");
table = soup.find("table", {"attrs": {"class": "aw-weekly-menu aw-group-5"}});
rows = table.find_all("p");
Food1Monday = " ".join(rows[5].text.split());
Food2Monday = " ".join(rows[10].text.split());
Food1Tuesday = " ".join(rows[6].text.split());
Food2Tuesday = " ".join(rows[11].text.split());
Food1Wednesday = " ".join(rows[7].text.split());
Food2Wednesday = " ".join(rows[12].text.split());
Food1Thursday = " ".join(rows[8].text.split());
Food2Thursday = " ".join(rows[13].text.split());
Food1Friday = " ".join(rows[9].text.split());
Food2Friday = " ".join(rows[14].text.split());
if ((currentdate === 0)) {
    console.log(`Montag:"${Food1Monday}" Bzw. "${Food2Monday}"`);
} else {
    if ((currentdate === 1)) {
        console.log(`Dienstag:"${Food1Tuesday}" Bzw. "${Food2Tuesday}"`);
    } else {
        if ((currentdate === 2)) {
            console.log(`Mittwoch:"${Food1Wednesday}" Bzw. "${Food2Wednesday}"`);
        } else {
            if ((currentdate === 3)) {
                console.log(`Donnerstag: "${Food1Thursday}" Bzw."${Food2Thursday}"`);
            } else {
                if ((currentdate === 4)) {
                    console.log(`Freitag: "${Food1Friday}" Bzw. "${Food2Friday}"`);
                } else {
                    console.log("Am Wochenende hat die Mense leider geschlossen! ;)");
                }
            }
        }
    }
}


