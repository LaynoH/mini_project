//import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface NewsItem {
  title: string;
  link: string;
  img: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]); 
  const router = useRouter();

  useEffect(() => {
    fetch("/api/news") // call API
      .then((res) => res.json())
      .then((data) => {
        const formattedNews = data.map((item: string[]) => ({
          title: item[0],
          link: item[1],
          img: item[2],
        }));
        setNews(formattedNews);
      })
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

  const handleReadMore = (title: string, img: string, url: string) => {
    router.push({
      pathname: "/detailPage",
      query: { title, img, url },
    });
  };
  
  return (
    <div>
      <nav className="navbar navbar-dark bg-blue-800">
        <div className="container-fluid">
          <h1 className="navbar-brand mx-auto ">NBA News</h1>
        </div>
      </nav>

      <div className="jumbotron jumbotron-fluid bg-blue-700 text-center p-4">
        <div className="ontainer-fluid text-white">
          <h1 className="display-4">Hello there! Here's the news related to NBA</h1>
          <p className="lead">
            Please click "Read more" for more details of news. Information referred from 
            <a className="text-white" href="https://tw-nba.udn.com/nba/index"> https://tw-nba.udn.com/nba/index </a>
            a.k.a UDN NBA
          </p>
        </div>
      </div>

      <div className="container my-5">
        <h1 className="text-center mb-4">Latest NBA News</h1>
        <div className="container-fluid">
          <div className="card">
              {news.map((item, index) => (
                <div className="row p-4" key={index}>
                  <div className="col-md-4">
                    <img className="card-img-top" src={item.img} alt={item.title} />
                  </div>
                  <div className="col-md-8">
                    <h2 className="card-title  pt-5 pb-3 text-2xl font-bold" >{item.title}</h2>
                    <button onClick={() => handleReadMore(item.title, item.img, item.link)} className="bg-blue-700 text-white py-3 px-6 mt-3 w-50">
                      For more details, click here
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="ontainer-fluid bg-blue-800 ">
        <footer className="py-3 w-full">
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item"><a href="https://github.com/LaynoH/mini_project.git" className="nav-link px-2 text-white">GitHub</a></li>
          </ul>
          <p className="text-center text-white">IMPLEMENTED BY ELAINE CHIANG</p>
        </footer>
      </div>
    </div>

 
    
  );
}
