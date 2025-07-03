import "./css/App.css";
import dataContext from "./contexts/dataContext";
import Header from "./components/Header";
import HomePage from "./pages/HomePage/HomePage";
import ErrorPage from "./pages/ErrorPage";
import SearchBar from "./components/SearchBar";
import CategorizePage from "./pages/CategorizePage/CategorizePage";
import BlogPage from "./pages/BlogPage/BlogPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categorize-page" element={<CategorizePage />} />
        <Route path="/blog-page" element={<BlogPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
