function BodyTemplate({ children, className = "bodyTemplate" }) {

  return (
    <>
      <div className={className}>
        {children}
      </div>   
    </>
  );
  }

export default BodyTemplate
