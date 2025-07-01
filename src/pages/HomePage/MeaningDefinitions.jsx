const MeaningDefinitions = ({ meaning }) => {
  return (
    <ul className="word__meanings">
      {meaning?.definitions.map((el) => (
        <li className="word__meaning" key={el.definition}>
          {el.definition}
        </li>
      ))}
    </ul>
  );
};

export default MeaningDefinitions;
