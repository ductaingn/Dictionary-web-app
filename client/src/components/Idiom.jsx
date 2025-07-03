import "../css/HomePage.css";

import MeaningsList from "./MeaningsList";

const Idiom = ({ data }) => {
  data = data[0];
  const meanings = data?.meanings;
  const audio = data?.phonetics.find(
    (item) => item.audio.length !== 0 && item?.audio
  )?.audio;

  return (
    <main className="main__container">
      <div className="word__heading">
        <h1 className="word">{data.word}</h1>
      </div>
      <p className="word__phonetic">【{data?.phonetic}】</p>
      <MeaningsList meanings={meanings} />
    </main>
  );
};

export default Idiom;
