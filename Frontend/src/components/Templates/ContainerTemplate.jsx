function ContainerTemplate({ children, className = "containerTemplate" }) {

  return (
    <>
      <div className={className}>
        {children}
      </div>   
    </>
  );
  }

export default ContainerTemplate
