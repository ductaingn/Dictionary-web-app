const MeaningSynonyms = ({ meaning }) => {
  return meaning.synonyms.length !== 0 ? (
    <>
      <h2 className="sub-title word__synonym-sub-title">Synonyms</h2>
      <p className="word__synonym">{meaning.synonyms[0]}</p>
    </>
  ) : (
    ""
  );
};

export default MeaningSynonyms;
