import "../../css/HomePage.css";

import SourceUrlsList from "./SourceUrlsList";
import MeaningsList from "./MeaningsList";
import AudioPlayBtn from "./AudioPlayBtn";

const HomePage = ({ data }) => {
  data = data[0];
  const meanings = data?.meanings;
  const audio = data?.phonetics.find(
    (item) => item.audio.length !== 0 && item?.audio
  )?.audio;

  return (
    <main className="main__container">
      <div className="word__heading">
        <h1 className="word">{data.word}</h1>
        <AudioPlayBtn audio={audio} />
      </div>
      <p className="word__phonetic">【{data?.phonetic}】</p>
      <MeaningsList meanings={meanings} />
      <SourceUrlsList urls={data?.sourceUrls} />
    </main>
  );
};

export default HomePage;
