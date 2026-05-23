import { useState } from "react";
import api from "../api/newsApi";
import NewsCard from "../components/NewsCard";

function Search() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const [loading, setLoading] = useState(false);

  const searchNews = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setSearchedText(query);

    try {
      const res = await api.get(
        `/top-headlines?country=us&category=${query.toLowerCase()}`
      );
      setArticles(res.data.articles || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setArticles([]);
    setSearchedText("");
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center search-text">Search News</h3>
      {/* Search Bar */}
      <div className="d-flex justify-content-center mt-5 mb-3">
        <div className="input-group search-box position-relative" style={{ maxWidth: "500px" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search news category (business, sports...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* Clear (X) Icon */}
          {query && (
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={clearSearch}
            >
              ✕
            </button>
          )}

          <button className="btn btn-primary" onClick={searchNews}>
            Search
          </button>
        </div>
      </div>

      {/* Searched Category Name */}
      {searchedText && (
        <h5 className="text-center mb-4 text-capitalize">
          Search Results for: <span className="text-primary">{searchedText}</span>
        </h5>
      )}

      {/* Loading State */}
      {loading && (
        <p className="text-center text-muted">Loading articles...</p>
      )}

      {/* Articles */}
      <div className="row g-3">
        {articles.map((article, index) => (
          <div className="col-6 col-md-4 col-lg-3" key={index}>
            <NewsCard article={article} />
          </div>
        ))}
      </div>

      {/* No Results */}
      {!loading && searchedText && articles.length === 0 && (
        <p className="text-center text-muted mt-4">
          No articles found for "{searchedText}"
        </p>
      )}
    </div>
  );
}

export default Search;
