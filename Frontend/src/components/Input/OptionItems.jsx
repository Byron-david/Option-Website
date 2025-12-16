function OptionItems(props) {
    return (
      props.items.map((item) => (
        <option key={item.id} value={item.value}>{item.text}</option>
     )
    ));
  }

export default OptionItems