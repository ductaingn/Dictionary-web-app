import "../css/CategorizePage.css";
import { useNavigate } from "react-router-dom";

const IdiomTag = ({ idiom }) => {
  const navigate = useNavigate();

  const handleNavigate = (idiomName) => {
    navigate(`/idiom/${encodeURIComponent(idiomName)}`);
  };

  return (
    <div
      className="idiom__tag"
      onClick={() => handleNavigate(idiom?.thanh_ngu_tieng_trung)}
    >
      <div className="idiom__tag-label">{idiom?.thanh_ngu_tieng_trung}</div>
      <div className="idiom__tag-phonetic">
        【{idiom?.phien_am}】【{idiom?.am_han_viet}】
      </div>
      <div className="idiom__tag-meaning">{idiom?.nghia}</div>
    </div>
  );
};
export default IdiomTag;
