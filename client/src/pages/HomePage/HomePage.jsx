import "../../css/HomePage.css";
import Idiom from "../../components/Idiom";
import SearchBar from "../../components/SearchBar";
import dataContext from "../../contexts/dataContext";
import { useState } from "react";

const HomePage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  return (
    <dataContext.Provider value={{ data, setData, error, setError }}>
      <main className="main__container">
        <SearchBar />
        {data && !error ? <Idiom data={data} /> : <></>}
      </main>
    </dataContext.Provider>
  );
};

export default HomePage;
