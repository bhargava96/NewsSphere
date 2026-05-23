import { useEffect, useState } from "react";
import api from "../api/newsApi";
import NewsCard from "../components/NewsCard";
import { feeds } from "../config/feeds";

function Feeds() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchFeeds = async () => {
      const result = {};

      for (const key of Object.keys(feeds)) {
        try {
          const feed = feeds[key];

          const res = await api.get(feed.endpoint, {
            params: feed.params,
          });

          result[key] = res.data.articles || [];
        } catch (err) {
          console.error(`Error loading ${key}`, err);
          result[key] = [];
        }
      }

      if (mounted) {
        setData(result);
        setLoading(false);
      }
    };

    fetchFeeds();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <p className="text-center mt-5">Loading feeds...</p>;
  }

  return (
    <div className="container mt-4">
      <h3 className="text-center feeds-text">Other News Feeds</h3>

      <hr />

      {Object.keys(feeds).map((key) => (
        <div key={key} className="mb-4">
          <h4 className="mb-4">{feeds[key].title}</h4>

          <div className="row g-3">
            {(data[key] || []).slice(0, 5).map((article, i) => (
              <div className="col-6 col-md-3 col-lg-2" key={i}>
                <NewsCard article={article} />
              </div>
            ))}
          </div>

          {(data[key] || []).length === 0 && (
            <p className="text-muted">No articles found.</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default Feeds;
