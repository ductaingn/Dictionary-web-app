import MeaningDefinitions from "./MeaningDefinitions";
import MeaningSynonyms from "./MeaningSynonyms";

const MeaningsList = ({ meanings }) => {
  return meanings.map((meaning) => {
    return (
      <section className="word__meaning-section" key={meaning.partOfSpeech}>
        <p className="word__part-of-speech">{meaning.partOfSpeech}</p>

        <h2 className="word__sub-title sub-title">Meaning</h2>
        <MeaningDefinitions meaning={meaning} />
        <MeaningSynonyms meaning={meaning} />
      </section>
    );
  });
};

export default MeaningsList;
