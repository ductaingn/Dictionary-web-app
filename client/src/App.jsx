import "./css/App.css";
import dataContext from "./contexts/dataContext";
import Header from "./components/Header";
import HomePage from "./pages/HomePage/HomePage";
import ErrorPage from "./pages/ErrorPage";
import SearchBar from "./components/SearchBar";
import CategorizePage from "./pages/CategorizePage/CategorizePage";
import BlogPage from "./pages/BlogPage/BlogPage";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  return (
    <dataContext.Provider value={{ data, setData, error, setError }}>
      <Header />
      <SearchBar />
      <Routes>
        <Route
          path="/"
          element={data && !error ? <HomePage data={data} /> : <></>}
        />
        <Route path="/categorize-page" element={<CategorizePage />} />
        <Route path="/blog-page" element={<BlogPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </dataContext.Provider>
  );
}

export default App;
