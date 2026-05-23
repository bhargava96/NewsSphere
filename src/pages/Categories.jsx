import { useEffect, useRef, useState } from "react";
import api from "../api/newsApi";
import NewsCard from "../components/NewsCard";
import { useLocation } from "react-router-dom";

const categories = [
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

function Categories() {
  const [cat, setCat] = useState("business");
  const [articles, setArticles] = useState([]);
  const fetchedCategory = useRef("");
  const location = useLocation();

  useEffect(() => {
    if (fetchedCategory.current === cat) return;
    fetchedCategory.current = cat;

    api
      .get("/top-headlines", {
        params: {
          category: cat,
          country: "us",
          pageSize: 10, 
        },
      })
      .then((res) => setArticles(res.data.articles || []))
      .catch((err) => console.error("Category API Error:", err));

    window.history.replaceState(
      null,
      "",
      `${location.pathname}#${cat}-news`
    );
  }, [cat, location.pathname]);

  return (
    <div className="container mt-4">
      <h3 className="text-center headlines-text">Top Categories</h3>

      <hr />

      {/* CATEGORY NAV */}
      <ul className="nav justify-content-center mt-4 flex-wrap nav-pills-custom">
        {categories.map((c) => (
          <li key={c} className="nav-item">
            <button
              className={`btn ${
                cat === c ? "btn-dark-active" : ""
              } m-1`}
              onClick={() => setCat(c)}
            >
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          </li>
        ))}
      </ul>

      {/* CATEGORY HEADER */}
      <h4 className="text-center mt-5 category-news">
        {cat.toUpperCase()} News
      </h4>

      {/* NEWS GRID → EXACTLY 5 PER ROW */}
      <div className="row g-3 mt-2">
        {articles.map((article, index) => (
          <div
            key={index}
            className="col-12 col-sm-6 col-md-4 col-lg-custom"
          >
            <NewsCard article={article} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
