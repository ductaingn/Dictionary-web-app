import { use } from "react";
import "../../css/CategorizePage.css";
import CategoriesList from "./CategoriesList";
import { useState, useEffect } from "react";
import baseCategories from "./baseCategories";
import { API_URL } from "../../utils/api";

function processCategoriesData(data) {
  const result = [];

  if (!Array.isArray(data) || data.length === 0) {
    return result; // Return empty array if data is not valid
  }

  // Iterate through the data to build the categories structure
  for (const row of data) {
    const category = row.category;
    const sub_category = row.sub_category;
    const sub_sub_category = row.sub_sub_category;
    const idioms = row.idioms.trim().split(/\s+/);

    // Find or create the main category
    let mainCategory = result.find((cat) => cat.name === category);
    if (!mainCategory) {
      mainCategory = { name: category, sub_categories: [] };
      result.push(mainCategory);
    }

    // Find or create the sub-category
    let subCategory = mainCategory.sub_categories.find(
      (subCat) => subCat.name === sub_category
    );
    if (!subCategory) {
      subCategory = {
        name: sub_category,
        sub_sub_categories: [{ name: sub_sub_category, idioms: idioms }],
      };
      mainCategory.sub_categories.push(subCategory);
    } else {
      subCategory.sub_sub_categories.push({
        name: sub_sub_category,
        idioms: idioms,
      });
    }
  }

  return baseCategories.concat(result);
}

const CategorizePage = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategoriesData(data);
      })
      .catch((err) => console.error("API fetch error:", err));
  }, []);

  useEffect(() => {
    if (categoriesData.length > 0) {
      const processedCategories = processCategoriesData(categoriesData);
      setCategories(processedCategories);
    }
  }, [categoriesData]);

  return (
    <main className="main__container">
      <CategoriesList categories={categories} />
    </main>
  );
};

export default CategorizePage;
