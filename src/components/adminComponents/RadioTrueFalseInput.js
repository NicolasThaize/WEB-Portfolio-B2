import React from "react";
import {UserContext} from "../../context";
import text from "../../assets/texts/admin/inputs.json";

class RadioTrueFalseInput extends React.Component{
  static contextType = UserContext;
  lang = this.context.language
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.context.language !== this.lang){
      this.lang = this.context.language
      this.setState({text: text[this.context.language]})
    }
  }


  state = {
    label: this.props.label,
    name: this.props.name,
    value: this.props.value,
    onChange: this.props.handleChange,
    text: text[this.lang]
  }

  static getDerivedStateFromProps(props, state){
    if (props.value === undefined){
      return state.value = ''
    }
    return state.value = props.value
  }


  render() {
    const { label, name, onChange, text, value } = this.state;
    return (
      <div>
        <label>
          {label}
          <label>
            <input value={true} type='radio' name={name} onChange={onChange} checked={value === true}/>
            {text.radio.yes}
          </label>
          <label>
            <input value={false} type='radio' name={name} onChange={onChange} checked={ value === false}/>
            {text.radio.no}
          </label>
        </label>
      </div>
    );
  }
}

export default RadioTrueFalseInput;
