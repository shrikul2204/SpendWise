const PageContainer = ({ title, children }) => {
  return (
    <div className="page-container">
      <h2 className="page-title">{title}</h2>
      <div className="page-card">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
