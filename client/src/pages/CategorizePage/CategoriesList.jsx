import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/CategorizePage.css";

const CategoriesList = ({ categories }) => {
  const [openSubCat, setOpenSubCat] = useState({});
  const navigate = useNavigate();

  const toggleSubCategory = (main, sub) => {
    const key = `${main}__${sub}`;
    setOpenSubCat((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleNavigate = (category, subCategory, subSubCategory = null) => {
    const base = `/categorize-page/${encodeURIComponent(
      category
    )}/${encodeURIComponent(subCategory)}`;
    const fullPath = subSubCategory
      ? `${base}/${encodeURIComponent(subSubCategory)}`
      : base;

    navigate(fullPath);
  };

  return categories.map((category) => (
    <section className="word__meaning-section" key={category.name}>
      <p className="word__part-of-speech">{category.name}</p>

      {category.sub_categories && (
        <div className="word__sub-categories-row">
          {category.sub_categories.map((sub_category) => {
            const key = `${category.name}__${sub_category.name}`;
            const hasSubSub =
              Array.isArray(sub_category.sub_sub_categories) &&
              sub_category.sub_sub_categories.length > 0;

            return (
              <div key={key} className="sub-category-block">
                {hasSubSub ? (
                  <>
                    <button
                      className="sub-title sub-categories-btn"
                      onClick={() =>
                        toggleSubCategory(category.name, sub_category.name)
                      }
                    >
                      {sub_category.name}
                    </button>

                    {openSubCat[key] && (
                      <ul className="sub-sub-category-list">
                        {sub_category.sub_sub_categories.map((sub_sub, i) => (
                          <li
                            key={i}
                            className="sub-sub-category-item"
                            onClick={() =>
                              handleNavigate(
                                category.name,
                                sub_category.name,
                                sub_sub.name
                              )
                            }
                          >
                            <strong>{sub_sub.name}</strong>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <button
                    className="sub-title sub-categories-btn"
                    onClick={() =>
                      handleNavigate(category.name, sub_category.name)
                    }
                  >
                    {sub_category.name}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  ));
};

export default CategoriesList;
