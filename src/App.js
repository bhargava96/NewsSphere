import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import TopHeadlines from "./pages/TopHeadlines";
import Categories from "./pages/Categories";
import Sources from "./pages/Sources";
import Bitcoin from "./pages/Bitcoin";
import ArticleDetail from "./pages/ArticleDetail";
import About from "./pages/About";
import Search from "./pages/Search";
import Feeds from "./pages/Feeds";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/headlines" element={<TopHeadlines />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/source" element={<Sources />} />
        <Route path="/bitcoin" element={<Bitcoin />} />
        <Route path="/article-detail/:id" element={<ArticleDetail />} />
        <Route path="/feeds" element={<Feeds />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

