import "../css/ErrorPage.css";

const ErrorPage = () => {
  return (
    <section className="error-page error-page__container">
      <p className="error-page__emoji">😕</p>
      <h1 className="error-page__title">Không tìm thấy dữ liệu</h1>
      <p className="error-page__paragraph">
        Xin lỗi, chúng tôi không thể tìm thấy dữ liệu cho từ bạn đang tìm kiếm.
        Bạn có thể thử tìm kiếm lại sau.
      </p>
    </section>
  );
};

export default ErrorPage;
