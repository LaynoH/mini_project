# mini_project
This repository includes codes which will be used to scrape data from certain website and then showing the data in a new webpage.
## Backend
### Environment
For the backend the environment is as shown below:
- Python 3.12.2
- pip 24.0
- Requests module `pip3 install requests`
- Beautiful Soup package`pip3 install beautifulsoup4`
- FastAPI: `pip3 install fastapi uvicorn`

### Files
`main.py`
>basically doing the scraping


## Frontend
### Environment
For the frontend the environment is as shown below:
- Node.js 18.20.7
> you can check and update if needed: `node -v` `nvm install 18` 
### Files
- `src/pages/index.tsx`
>the main page when started

- `src/pages/detailPage.tsx`
>the page showing details of the news

- `src/pages/api/news.ts`
>call FastAPI for main page

- `src/page/api/news-details.ts`
>call FastAPI for news detail page

## TO RUN
### backend terminal
`uvicorn main:app --host 0.0.0.0 --port 8000`
### frontend terminal
`npm run dev`
### browser
`http://localhost:3000/`
