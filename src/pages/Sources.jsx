import { useState } from "react";
import api from "../api/newsApi";
import NewsCard from "../components/NewsCard";

const COUNTRIES = [
  "us","in","gb","au","ca","fr","de","jp","ru","ar","gr","nl",
  "za","hk","nz","kr","at","hu","ng","se","be","no","ch","bg",
  "ie","br","id","ph","tw","pl","th","il","pt","tr","cn","it",
  "ro","ae","co","ua","cu","lv","sa","cz","lt","rs","eg","my",
  "sg","ve","mx","sk","ma","si"
];

function Sources() {
  const [articles, setArticles] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [loading, setLoading] = useState(false);

  const loadCountryNews = async (code) => {
    setSelectedCountry(code);
    setArticles([]);
    setLoading(true);

    try {
      const response =
        code === "us"
          ? await api.get("/top-headlines", {
              params: { country: "us", pageSize: 10 },
            })
          : await api.get("/everything", {
              params: {
                q: code,
                sortBy: "publishedAt",
                pageSize: 10,
              },
            });

      setArticles(response.data.articles || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4 country-text">Other Sources</h3>
      <hr />

      {/* COUNTRY LIST */}
      {!loading && articles.length === 0 && (
        <div className="row justify-content-center">
          {COUNTRIES.map((code) => (
            <div className="col-6 col-md-3 col-lg-2" key={code}>
              <div
                className="card country-source p-4 m-3 text-center"
                style={{ cursor: "pointer" }}
                onClick={() => loadCountryNews(code)}
              >
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <img
                    src={`https://flagcdn.com/w40/${code}.png`}
                    alt={code}
                    width="45"
                    height="35"
                  />
                  <strong>{code.toUpperCase()}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <p className="text-center text-muted">Loading news...</p>
      )}

      {/* ARTICLES – 5 PER ROW */}
      {!loading && articles.length > 0 && (
        <>
          <h5 className="text-center mb-3 top-news-text">
            Top News – {selectedCountry.toUpperCase()}
          </h5>

          <div
            className="news-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "1rem",
            }}
          >
            {articles.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
          </div>
        </>
      )}

      {/* EMPTY STATE */}
      {!loading && selectedCountry && articles.length === 0 && (
        <p className="text-center text-muted">
          No news available for this country.
        </p>
      )}
    </div>
  );
}

export default Sources;
