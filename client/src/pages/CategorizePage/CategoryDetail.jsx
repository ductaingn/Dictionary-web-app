import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../css/CategorizePage.css";
import IdiomTag from "../../components/IdiomTag";
import { API_URL } from "../../utils/api";
import Loading from "../../components/Loading";
import ErrorPage from "../ErrorPage";

const getIdiomAttributes = async (idioms) => {
  const results = await Promise.all(
    idioms.map(async (idiom) => {
      try {
        const res = await fetch(
          `${API_URL}/api/idioms/${encodeURIComponent(idiom)}`
        );

        if (res.ok) {
          const data = await res.json();
          return {
            thanh_ngu_tieng_trung: data.thanh_ngu_tieng_trung,
            nghia: data.nghia,
            phien_am: data.phien_am,
            am_han_viet: data.am_han_viet,
          };
        } else {
          // Idiom not found in the database
          return {
            thanh_ngu_tieng_trung: idiom,
            nghia: "Không tìm thấy",
            phien_am: "",
            am_han_viet: "",
          };
        }
      } catch (err) {
        console.error("Error fetching idiom:", idiom, err);
        return {
          thanh_ngu_tieng_trung: idiom,
          nghia: "Lỗi kết nối",
          phien_am: "",
          am_han_viet: "",
        };
      }
    })
  );

  return results;
};

const CategoryDetail = () => {
  const { category, subCategory, subSubCategory } = useParams();
  const [idioms, setIdioms] = useState([]);
  const [idiomsAttributes, setIdiomsAttributes] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `${API_URL}/api/categories/${category}/${subCategory}/${
        subSubCategory || ""
      }`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Category not found");
        }
        return res.json();
      })
      .then((data) => {
        const idiomsList = data
          .map((item) => {
            try {
              return JSON.parse(item.idioms);
            } catch (e) {
              console.warn("Invalid idioms format:", item.idioms);
              return [];
            }
          })
          .flat();

        setIdioms(idiomsList);
      })
      .catch((err) => {
        console.error("API fetch error:", err);
        setIdioms([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [category, subCategory, subSubCategory]);

  useEffect(() => {
    const load = async () => {
      const attributes = await getIdiomAttributes(idioms);
      setIdiomsAttributes(attributes);
    };
    load();
  }, [idioms]);

  return (
    <main className="main__container">
      <h2>{decodeURIComponent(category)}</h2>
      <h3>{decodeURIComponent(subCategory)}</h3>
      {subSubCategory && <h4>{decodeURIComponent(subSubCategory)}</h4>}
      {isLoading ? (
        <Loading />
      ) : idioms.length === 0 ? (
        <ErrorPage />
      ) : (
        <div className="idioms__list">
          {idioms.map((idiom, index) => (
            <IdiomTag key={index} idiom={idiomsAttributes[index]} />
          ))}
        </div>
      )}
    </main>
  );
};

export default CategoryDetail;
