import React from "react";

class TextInput extends React.Component{
  state = {
    label: this.props.label,
    name: this.props.name,
    value: this.props.value,
    onChange: this.props.handleChange
  }

  static getDerivedStateFromProps(props, state){
    if (props.value === undefined){
      return state.value = ''
    }
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
