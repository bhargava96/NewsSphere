import { Link } from "react-router-dom";

function NewsCard({ article }) {
  const articleId = encodeURIComponent(
    `${article.title?.slice(0, 40)}-${new Date(article.publishedAt || Date.now()).getTime()}`
      .replace(/\s+/g, "-")
      .toLowerCase()
  );

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <div className="card article-card">
      <div className="article-card-img-wrapper">
        {article.source?.name && (
          <span className="article-card-badge">{article.source.name}</span>
        )}
        <img
          src={article.urlToImage || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=400&q=80"}
          className="card-img-top"
          alt={article.title || "News Image"}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=400&q=80";
          }}
        />
      </div>
      <div className="card-body">
        <h6 className="card-title article-text" title={article.title}>
          {article.title}
        </h6>
        
        <p className="card-text">
          {article.description || "Click below to view full coverage and read the detailed news article."}
        </p>

        <div className="d-flex align-items-center justify-content-between mt-auto pt-2">
          {formattedDate && (
            <span className="text-muted" style={{ fontSize: "0.75rem", fontWeight: "500" }}>
              {formattedDate}
            </span>
          )}
          <Link to={`/article-detail/${articleId}`} className="view-link" state={article}>
            READ MORE <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
