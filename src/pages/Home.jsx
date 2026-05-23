import { Link } from "react-router-dom";

function Home() {
  const dashboardItems = [
    {
      title: "Top Headlines",
      desc: "Stay updated with real-time trending stories from around the globe.",
      path: "/headlines",
      icon: "🔥",
    },
    {
      title: "News Categories",
      desc: "Explore tailored news across tech, business, sports, and science.",
      path: "/categories",
      icon: "📁",
    },
    {
      title: "Global Sources",
      desc: "Read curated articles from popular global publishers and countries.",
      path: "/source",
      icon: "🌍",
    },
    {
      title: "Bitcoin News",
      desc: "Keep track of crypto markets, blockchain tech, and financial shifts.",
      path: "/bitcoin",
      icon: "🪙",
    },
    {
      title: "Other Feeds",
      desc: "Browse specialized RSS and API news feeds in one single layout.",
      path: "/feeds",
      icon: "📡",
    },
    {
      title: "Smart Search",
      desc: "Find specific news reports immediately using smart keyword filters.",
      path: "/search",
      icon: "🔍",
    },
    {
      title: "About Us",
      desc: "Meet our professional team and learn about our core publication values.",
      path: "/about",
      icon: "✨",
    },
  ];

  return (
    <div className="container mt-4 mb-5">
      {/* Premium Hero Section */}
      <div className="home-hero-image mx-auto position-relative" style={{ height: "380px" }}>
        <div className="home-hero-overlay">
          <h1 className="hero-text">Welcome to NewsSphere</h1>
          <p className="mt-2 text-white-50 max-width-600 px-3 d-none d-md-block" style={{ fontSize: "1.05rem" }}>
            Your premium gateway to global insights, trending headlines, and trusted news.
          </p>
        </div>
      </div>

      {/* Intro text */}
      <div className="text-center mt-5 mx-auto" style={{ maxWidth: "800px" }}>
        <p className="lead px-3 text-muted" style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
          NewsSphere delivers accurate, timely, and completely unbiased updates from around the world.
          We aggregate headlines from top-tier sources so you never miss a beat on politics, technology,
          sports, entertainment, or science.
        </p>
      </div>

      <hr className="my-5" />

      {/* Interactive Navigation Dashboard */}
      <h3 className="text-center mb-4" style={{ fontWeight: 800 }}>Explore NewsSphere</h3>
      <div className="home-dashboard">
        {dashboardItems.map((item) => (
          <Link to={item.path} key={item.title} className="dashboard-card">
            <div className="dashboard-icon">{item.icon}</div>
            <div className="dashboard-title">{item.title}</div>
            <div className="dashboard-desc">{item.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
