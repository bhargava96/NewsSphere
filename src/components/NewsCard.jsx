import { Link } from "react-router-dom";

function NewsCard({ article }) {

  const articleId = encodeURIComponent(
    `${article.title?.slice(0, 40)}-${new Date(article.publishedAt).getTime()}`
      .replace(/\s+/g, "-")
      .toLowerCase()
  );

  return (
    <div className="card h-85 shadow-sm article-card">
      <img
        src={article.urlToImage || "https://via.placeholder.com/300"}
        className="card-img-top"
        alt=""
      />
      <div className="card-body">
        <h6 className="card-title article-text">{article.title}</h6>
        <div className="mt-2">
          <Link to={`/article-detail/${articleId}`} className="view-link" state={article}>
            VIEW <span style={{ marginLeft: "4px" }}>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
