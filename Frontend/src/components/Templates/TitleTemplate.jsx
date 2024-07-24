function TitleTemplate({ children, className = "titleTemplate" }) {
  return (
    <>
      <div className={className}>
        {children}
      </div>   
    </>
  );
  }

export default TitleTemplate
