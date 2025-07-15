import { log } from "console";

function getBaseCategoryIdiomsQuery(category, subCategory) {
  if (category === "Theo chữ cái đầu") {
    const queryObj = {
      query:
        "SELECT thanh_ngu_tieng_trung FROM idioms WHERE am_han_viet_ascii LIKE ? ORDER BY thanh_ngu_tieng_trung",
      params: [`${subCategory}%`],
    };

    return queryObj;
  }

  if (category === "Theo cấu trúc hình thức") {
    const queryObj = {
      query:
        "SELECT thanh_ngu_tieng_trung FROM idioms WHERE ket_cau_hinh_thuc = ? ORDER BY thanh_ngu_tieng_trung",
      params: [subCategory],
    };
    return queryObj;
  }

  if (category === "Theo kết cấu ngữ pháp") {
    const queryObj = {
      query:
        "SELECT thanh_ngu_tieng_trung FROM idioms WHERE ket_cau_ngu_phap = ? COLLATE NOCASE ORDER BY thanh_ngu_tieng_trung",
      params: [subCategory.replace(/^Kết cấu\s*/, "")],
    };

    return queryObj;
  }

  return null;
}

export default getBaseCategoryIdiomsQuery;
