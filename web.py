import requests
import bs4 as bs

proxies = {
    'http': 'http://10.10.1.10:3128',
    'https': 'http://10.10.1.10:1080',
}

try:
    # res = requests.get('https://www.imdb.com/list/ls053181721/', proxies=proxies)
    res = requests.get('https://www.imdb.com/list/ls053181721/')
    res.raise_for_status()  # Raise an exception if the request was unsuccessful
except requests.exceptions.RequestException as e:
    print(f"An error occurred while making the request: {e}")
else:
    soup = bs.BeautifulSoup(res.text, 'html.parser')

    # Find all divs with class 'lister-item mode-detail'
    movie_divs = soup.find_all('div', class_='lister-item mode-detail')

    # Loop through each div to find the a tag and get its text
    for div in movie_divs:
        a_tags = div.find_all('a')
        if len(a_tags) > 1:
            print(a_tags[1].text.strip())
