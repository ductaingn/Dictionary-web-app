import "../css/HomePage.css";
import { useNavigate } from "react-router-dom";

const IdiomAttribute = ({ label, children }) => {
  return (
    <div className="idiom__attribute">
      <p className="idiom__atttribute-label">{label}</p>
      <div>{children}</div>
    </div>
  );
};

const Idiom = ({ data }) => {
  const navigate = useNavigate();

  const handleNavigate = (idiomName) => {
    navigate(`/idiom/${encodeURIComponent(idiomName)}`);
  };

  const tu_can_nghia =
    data?.tu_can_nghia?.split("、").map((item) => item.trim()) || [];

  const tu_trai_nghia =
    data?.tu_trai_nghia?.split("、").map((item) => item.trim()) || [];

  return (
    <main className="main__container">
      <div className="word__heading">
        <h1 className="word">{data.thanh_ngu_tieng_trung}</h1>
      </div>

      <p className="word__phonetic">
        【{data?.phien_am}】【{data?.am_han_viet}】
      </p>
      <div>
        {data?.ket_cau_ngu_phap && (
          <div className="idiom__atttribute-label">
            Kết cấu ngữ pháp: {data.ket_cau_ngu_phap}
          </div>
        )}
        {data?.sac_thai_bieu_cam && (
          <div className="idiom__atttribute-label">
            Sắc thái biểu cảm: {data.sac_thai_bieu_cam}
          </div>
        )}
      </div>

      <IdiomAttribute label="Nghĩa">
        <p>{data.nghia}</p>
      </IdiomAttribute>

      {data?.cach_dung && (
        <IdiomAttribute label="Cách dùng">
          <p>{data.cach_dung}</p>
        </IdiomAttribute>
      )}

      {(data?.vi_du_tieng_trung || data?.vi_du_tieng_viet) && (
        <IdiomAttribute label="Ví dụ">
          {data?.vi_du_tieng_trung && <p>{data.vi_du_tieng_trung}</p>}
          {data?.vi_du_tieng_viet && <p>{data.vi_du_tieng_viet}</p>}
        </IdiomAttribute>
      )}
      {data?.tu_can_nghia && (
        <IdiomAttribute label="Từ cận nghĩa">
          <ul className="idiom__attribute-synonym">
            {tu_can_nghia.map((item, index) => (
              <li
                key={index}
                onClick={() => handleNavigate(item)}
                className="idiom__attribute-synonym-item"
              >
                {item}
              </li>
            ))}
          </ul>
        </IdiomAttribute>
      )}
      {data?.tu_trai_nghia && (
        <IdiomAttribute label="Từ trái nghĩa">
          <ul className="idiom__attribute-synonym">
            {tu_trai_nghia.map((item, index) => (
              <li
                key={index}
                onClick={() => handleNavigate(item)}
                className="idiom__attribute-synonym-item"
              >
                {item}
              </li>
            ))}
          </ul>
        </IdiomAttribute>
      )}
      {data?.chu_de && (
        <IdiomAttribute label="Chủ đề">
          <p>{data.chu_de}</p>
        </IdiomAttribute>
      )}
      {data?.nguon_goc_thanh_ngu && (
        <IdiomAttribute label="Nguồn gốc">
          <p>{data.nguon_goc_thanh_ngu}</p>
        </IdiomAttribute>
      )}
      {data?.cau_chuyen_thanh_ngu && (
        <IdiomAttribute label="Câu chuyện thành ngữ">
          <p>{data.cau_chuyen_thanh_ngu}</p>
        </IdiomAttribute>
      )}
    </main>
  );
};

export default Idiom;
