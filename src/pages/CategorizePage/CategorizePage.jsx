import "../../css/CategorizePage.css";
import CategoriesList from "./CategoriesList";

const CategorizePage = () => {
  const categories = [
    {
      name: "Theo chữ cái đầu",
      sub_categories: Array.from({ length: 26 }, (_, index) =>
        String.fromCharCode(65 + index)
      ),
    },
    {
      name: "Theo cấu trúc hình thức",
      sub_categories: [
        "AABB",
        "AABC",
        "ABAB",
        "ABAC",
        "ABCC",
        "ABBC",
        "ABCB",
        "ABCA",
      ],
    },
    {
      name: "Theo kết cấu ngữ pháp",
      sub_categories: [
        "主谓式",
        "动宾式",
        "联合式",
        "偏正式",
        "连动式",
        "补充式",
        "紧缩式",
        "复句式",
        "复杂式",
      ],
    },
    {
      name: "Thành ngữ về con giáp",
      sub_categories: ["A", "B"],
    },
    {
      name: "Thành ngữ về tự nhiên",
    },
    {
      name: "Thành ngữ về mùa",
    },
    {
      name: "Thành ngữ về khí hậu",
    },
    {
      name: "Thành ngữ về động vật",
    },
    {
      name: "Thành ngữ về thực vật",
    },
    {
      name: "Thành ngữ về thực phẩm",
    },
    {
      name: "Thành ngữ về màu sắc",
    },
    {
      name: "Thành ngữ về con số",
    },
    {
      name: "Thành ngữ về bộ phận",
    },
    {
      name: "Thành ngữ về cảm xúc",
    },
    {
      name: "Thành ngữ về quân sự",
    },
    {
      name: "Thành ngữ về phương vị",
    },
    {
      name: "Thành ngữ có nguồn gốc điển cố",
    },
    {
      name: "Thành ngữ khác",
    },
  ];

  return (
    <main className="main__container">
      <CategoriesList categories={categories} />
    </main>
  );
};

export default CategorizePage;
