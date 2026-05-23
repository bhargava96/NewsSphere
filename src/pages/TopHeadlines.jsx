import { useEffect, useState } from "react";
import api from "../api/newsApi";
import NewsCard from "../components/NewsCard";

function TopHeadlines() {
  const [articles, setArticles] = useState([]);
  const [visible, setVisible] = useState(10);

  useEffect(() => {
    api
      .get("/top-headlines", {
        params: {
          country: "us",
          pageSize: 10,
        },
      })
      .then((res) => setArticles(res.data.articles || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="text-center headlines-text">Top Headlines</h3>
      <hr />
      {/* NEWS GRID */}
      <div className="news-grid mt-4">
        {articles.slice(0, visible).map((article, index) => (
          <div key={index} className="news-grid-item">
            <NewsCard article={article} />
          </div>
        ))}
      </div>

      {/* LOAD MORE */}
      {articles.length > visible && (
        <div className="text-center mt-4">
          <button
            className="btn btn-primary"
            onClick={() => setVisible((v) => v + 10)}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default TopHeadlines;
