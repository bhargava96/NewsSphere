import { useEffect, useRef, useState } from "react";
import api from "../api/newsApi";
import NewsCard from "../components/NewsCard";

function Bitcoin() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetched = useRef(false); // prevents duplicate API calls

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    api
      .get("/everything", {
        params: {
          q: "bitcoin",
          language: "en",
          sortBy: "publishedAt",
          pageSize: 10,
        },
      })
      .then((res) => {
        setArticles(res.data.articles || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4 bitcoin-text">Bitcoin News</h3>

      <hr />

      {loading && (
        <p className="text-center text-muted">Loading bitcoin news...</p>
      )}

      {!loading && articles.length === 0 && (
        <p className="text-center text-muted">
          No bitcoin news available at the moment.
        </p>
      )}

      <div className="row g-3">
        {articles.map((article, index) => (
          <div className="col-6 col-md-4 col-lg-3" key={index}>
            <NewsCard article={article} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bitcoin;
