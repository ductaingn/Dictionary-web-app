const SourceUrlsList = ({ urls }) => {
  return urls.map((link) => {
    return (
      <section key={link} className="word__source-section">
        <a href={link} className="word__source sub-title">
          Source
        </a>
        <a href={link} className="word__source-link">
          {link}
        </a>
      </section>
    );
  });
};

export default SourceUrlsList;
