import React from "react";

class TextInput extends React.Component{
  state = {
    label: this.props.label,
    name: this.props.name,
    value: this.props.value,
    onChange: this.props.handleChange
  }

  componentDidMount() {
    console.log(this.state)
  }

  static getDerivedStateFromProps(props, state){
    return state.value = props.value
  }


  render() {
    const { label, name, value, onChange } = this.state;
    return (
      <div>
        <label>
          {label}
          <input value={value} type='text' name={name} onChange={onChange}/>
        </label>
      </div>
    );
  }
}

export default TextInput;
