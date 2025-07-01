import playAudio from "../../utils/playAudio";

const AudioPlayBtn = ({ audio }) => {
  return audio ? (
    <button className="word-audio" onClick={() => playAudio(audio)}></button>
  ) : (
    ""
  );
};

export default AudioPlayBtn;
