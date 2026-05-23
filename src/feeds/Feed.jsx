import { useEffect, useState } from "react";
import api from "../api/newsApi";
import NewsCard from "../components/NewsCard";

const Feed = ({ feedKey, feed }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    api
      .get(feed.endpoint, { params: feed.params })
      .then(res => setArticles(res.data.articles))
      .catch(err => console.error(err));
  }, [feed]);

  return (
    <>
      <h5 className="mb-2 mt-4">{feed.title}</h5>
      <div className="row g-2 mt-4">
        {articles.slice(0, 5).map((a, i) => (
          <div className="col-6 col-md-4" key={i}>
            <NewsCard article={a} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Feed;
