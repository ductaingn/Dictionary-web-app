import "../../css/HomePage.css";
import Idiom from "../../components/Idiom";
import SearchBar from "../../components/SearchBar";
import dataContext from "../../contexts/dataContext";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/api";

const HomePage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { idiomName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (idiomName) {
      const fetchIdiom = async () => {
        try {
          const res = await fetch(
            `${API_URL}/api/idioms/${encodeURIComponent(idiomName)}`
          );
          if (!res.ok) throw new Error("Không tìm thấy thành ngữ");
          const result = await res.json();
          setData(result);
          setError(null);
        } catch (err) {
          setData(null);
          setError(err.message);
        }
      };

      fetchIdiom();
    }
  }, [idiomName]);

  return (
    <dataContext.Provider value={{ data, setData, error, setError }}>
      <main className="main__container">
        <SearchBar />
        {data && !error && <Idiom data={data} />}
        {error && <p className="error">{error}</p>}
      </main>
    </dataContext.Provider>
  );
};

export default HomePage;
