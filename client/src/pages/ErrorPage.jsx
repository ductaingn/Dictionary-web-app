import "../css/ErrorPage.css"

const ErrorPage = () => {
  return (
    <section className="error-page error-page__container">
      <p className="error-page__emoji">😕</p>
      <h1 className="error-page__title">No Definitions Found</h1>
      <p className="error-page__paragraph">
        Sorry pal, we couldn't find definitions for the word you were looking
        for. You can try the search again at later time or head to the web
        instead.
      </p>
    </section>
  );
};

export default ErrorPage;
