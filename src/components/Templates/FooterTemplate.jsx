function FooterTemplate({ children, className = "footerTemplate" }) {
  return (
    <>
      <div className={className}>
        {children}
      </div>   
    </>
  );
  }

export default FooterTemplate
