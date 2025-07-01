import "../../css/CategorizePage.css";

const CategoriesList = ({ categories }) => {
  return categories.map((category) => {
    return (
      <section className="word__meaning-section" key={category.name}>
        <p className="word__part-of-speech">{category.name}</p>

        {category.sub_categories ? (
          <div className="word__sub-categories-row">
            {category.sub_categories.map((sub_category, idx) => (
              <button className="sub-title sub-categories-btn" key={idx}>
                {sub_category}
              </button>
            ))}
          </div>
        ) : null}
      </section>
    );
  });
};

export default CategoriesList;
