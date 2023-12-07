from bs4 import BeautifulSoup
from datetime import datetime
import requests

currentdate = datetime.today().weekday()
url = f'https://www.mensaplan.de/zweibruecken/mensa-zweibruecken/index.html'
page = requests.get(url)
soup = BeautifulSoup(page.content, 'html.parser')
table = soup.find('table',attrs={'class':'aw-weekly-menu aw-group-5'})
rows = table.find_all('p')

Food1Monday = " ".join(rows[5].text.split())
Food2Monday = " ".join(rows[10].text.split())
Food1Tuesday = " ".join(rows[6].text.split())
Food2Tuesday = " ".join(rows[11].text.split())
Food1Wednesday = " ".join(rows[7].text.split())
Food2Wednesday = " ".join(rows[12].text.split())
Food1Thursday = " ".join(rows[8].text.split())
Food2Thursday = " ".join(rows[13].text.split())
Food1Friday = " ".join(rows[9].text.split())
Food2Friday = " ".join(rows[14].text.split())

if currentdate == 0:
    print(f'Montag:\n{Food1Monday}\n{Food2Monday}')
elif currentdate == 1:
    print(f'Dienstag:\n{Food1Tuesday}\n{Food2Tuesday}')
elif currentdate == 2:
    print(f'Mittwoch:\n{Food1Wednesday}\n{Food2Wednesday}')
elif currentdate == 3:
    print(f'Donnerstag:\n{Food1Thursday}\n{Food2Thursday}')
elif currentdate == 4:
    print(f'Freitag:\n{Food1Friday}\n{Food2Friday}')
else:
    print('Am Wochenende hat die Mense leider geschlossen! ;)')