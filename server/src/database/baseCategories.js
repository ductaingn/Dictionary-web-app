const baseCategories = [
  {
    name: "Theo chữ cái đầu",
    sub_categories: Array.from({ length: 26 }, (_, index) => ({
      name: String.fromCharCode(65 + index),
    })),
  },
  {
    name: "Theo cấu trúc hình thức",
    sub_categories: [
      {
        name: "AABB",
      },
      {
        name: "AABC",
      },
      {
        name: "ABAB",
      },
      {
        name: "ABAC",
      },
      {
        name: "ABCC",
      },
      {
        name: "ABBC",
      },
      {
        name: "ABCB",
      },
      {
        name: "ABCA",
      },
    ],
  },
  {
    name: "Theo kết cấu ngữ pháp",
    sub_categories: [
      {
        name: "Kết cấu chủ vị",
      },
      {
        name: "Kết cấu động tân",
      },
      {
        name: "Kết cấu liên hợp",
      },
      {
        name: "Kết cấu chính phụ",
      },
      {
        name: "Kết cấu liên động",
      },
      {
        name: "Kết cấu bổ sung",
      },
      {
        name: "Kết cấu rút gọn",
      },
      {
        name: "Kết cấu câu phức",
      },
      {
        name: "Kết cấu phức tạp",
      },
    ],
  },
];

export default baseCategories;
