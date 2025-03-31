import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface NewsDetail {
  title: string;
  img: string;
  detail: string;
}

export default function DetailPage() {
    const router = useRouter();
    const { title, img, url } = router.query;
    const [newsDetail, setNewsDetail] = useState<NewsDetail | null>(null);

    useEffect(() => {
        if (!router.isReady || !url) return;
        fetch(`/`${process.env.BACKEND_API_URL}/news-detail?url=${encodeURIComponent(url as string)}`)
        .then((res) => res.json())
        .then((data) => {
            // console.log("Data received:", data);  // for debugging
            setNewsDetail({
              title: title as string,
              img: img as string,
              detail: data.detail || "Content not available",
            });
        })
        .catch((err) => console.error("Error fetching news details:", err));
    }, [router.isReady, title, img, url]);
    

    console.log("hi");  
    console.log(newsDetail);  

if (!newsDetail) {
    return <div className="text-center p-10">Loading...</div>;
}


return (
    <div>
        <nav className="navbar navbar-dark bg-blue-800">
            <div className="container-fluid">
            <h1 className="navbar-brand mx-auto ">NBA News</h1>
            </div>
        </nav>

        <div className="w-full min-h-screen flex flex-col items-center text-center p-6">
            <h1 className="text-9xl font-bold mb-8">{newsDetail.title}</h1>
            {newsDetail.img && (
                <img className="w-1/3 h-auto my-8 rounded-lg shadow-lg" src={newsDetail.img} alt={newsDetail.title} />
            )}
            <p className="text-3xl max-w-7xl w-1/2 font-bold">{newsDetail.detail}</p>
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
