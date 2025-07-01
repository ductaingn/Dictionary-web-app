const playAudio = (audioSrc) => {
  const audio = new Audio();
  audio.src = audioSrc;
  audio.play();
};

export default playAudio;
