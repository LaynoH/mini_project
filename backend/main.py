import requests
from bs4 import BeautifulSoup
from fastapi import FastAPI

app = FastAPI()

#@app.get("/news")
@app.get("/news")
def get_news():
    source = requests.get('https://tw-nba.udn.com/nba/index')
    print(source)

    soup = BeautifulSoup(source.content, 'html.parser')
    newsBlock = soup.find('div', id='news_list_body')

    newsList = []

    for i in newsBlock.find_all('dt'):
        if i.find('div'):
            continue
        newsTitle = i.find('a').get('title')
        newsLink = i.find('a').get('href')
        newsImg = i.find('a').find('span').find('img').get('src')
        #print(newsTitle)
        #print(newsLink)
        #print(newsImg)
        
        newsList.append([newsTitle, newsLink, newsImg])
    for i in newsList:
        print(i)
        
    return newsList

@app.get("/news-detail")
def get_news_detail(url):
    source = requests.get(url)
    soup = BeautifulSoup(source.content, 'html.parser')
    storyBlock = soup.find('div', id='story_body_content')
    
    context = []
    detail = ""
    
    for i in storyBlock.find_all('p'):
        print(i)
        print("\n")
        print("\n")
        if i.find('div') or i.find('figure'):
            continue
        detail += i.text
    print(detail)
    return detail

#newsL = get_news()
#get_news_detail("https://tw-nba.udn.com/nba/story/7002/8636386")
#get_news()
