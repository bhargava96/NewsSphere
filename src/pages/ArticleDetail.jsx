import { useLocation, useNavigate, useParams } from "react-router-dom";

function ArticleDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  if (!state) {
    return (
      <div className="container mt-5 text-center">
        <p className="text-muted">No article data available.</p>
        <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>
          <span style={{ marginLeft: "4px" }}>←</span> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container text-center mt-4 mb-5">
      <h3 className="text-center mb-4 article-detail">News Article Detail</h3>

      <hr />

      {/* IMAGE */}
      <div className="mb-4 text-center">
        <img
          src={state.urlToImage || "https://via.placeholder.com/800x400"}
          alt={state.title}
          className="img-fluid rounded "
        />
      </div>
      {/* TITLE */}
      {state.title && (
        <h4 className="mb-3">{state.title}</h4>
      )}
      {/* SOURCE NAME */}
      {state.source?.name && (
        <p className="text-muted mb-2">
          <strong>Source:</strong> {state.source.name}
        </p>
      )}
      {/* AUTHOR */}
      {state.author && (
        <p className="text-muted mb-2">
          <strong>Author:</strong> {state.author}
        </p>
      )}
      {/* PUBLISHED DATE */}
      {state.publishedAt && (
        <p className="text-muted mb-3">
          <strong>Published:</strong>{" "}
          {new Date(state.publishedAt).toLocaleString()}
        </p>
      )}
      {/* DESCRIPTION */}
      {state.description && (
        <p className="mt-3">{state.description}</p>
      )}
      {/* CONTENT */}
      {state.content && (
        <p className="mt-3">{state.content}</p>
      )}
      {/* ORIGINAL ARTICLE LINK */}
      {state.url && (
        <a
          href={state.url}
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline-primary mt-3"
        >
          Read Full Article
        </a>
      )}

      {/* BACK BUTTON */}
      <div className="mt-5">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          <span style={{ marginLeft: "4px" }}>←</span> Go Back
        </button>
      </div>
    </div>
  );
}

export default ArticleDetail;
