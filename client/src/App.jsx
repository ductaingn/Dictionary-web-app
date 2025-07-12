import "./css/App.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage/HomePage";
import ErrorPage from "./pages/ErrorPage";
import CategorizePage from "./pages/CategorizePage/CategorizePage";
import CategoryDetail from "./pages/CategorizePage/CategoryDetail";
import BlogPage from "./pages/BlogPage/BlogPage";
import BlogPageDetail from "./pages/BlogPage/BlogPostDetail";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/idiom/:idiomName" element={<HomePage />} />
        <Route path="/categorize-page" element={<CategorizePage />} />
        <Route
          path="/categorize-page/:category/:subCategory"
          element={<CategoryDetail />}
        />
        <Route
          path="/categorize-page/:category/:subCategory/:subSubCategory?"
          element={<CategoryDetail />}
        />
        <Route path="/blog-page" element={<BlogPage />} />
        <Route path="/blog-page/:postId" element={<BlogPageDetail />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
