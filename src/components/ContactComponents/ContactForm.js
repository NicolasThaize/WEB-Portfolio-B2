import React from "react";
import { UserContext } from "../../context";
import ContactInput from "./ContactInput";
import text from "../../assets/texts/contact.json";

class ContactForm extends React.Component {
  static contextType = UserContext;
  lang = this.context.language;
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.context.language !== this.lang) {
      this.lang = this.context.language;
      this.setState({ text: text[this.context.language] });
    }
  }

  state = {
    text: text[this.lang],
    inputs: this.props.inputs,
    error: undefined
  };

  /**
   * Updates the inputs depending on the language
   * @param props
   * @param state
   * @returns {*}
   */
  static getDerivedStateFromProps(props, state) {
    return (state.inputs = props.inputs);
  }

  /**
   * Method send to children components to get their input values.
   * @param e
   * @param index
   */
  inputsHandleChange  = (e, index) => {
    let newInputs = this.state.inputs;
    newInputs[index].error = "";
    this.setState({inputs: newInputs})
    if (e.target.value === ""){
      newInputs[index].error = this.state.text.errors.field_not_filled;
      return this.setState({inputs: newInputs})
    }
    newInputs[index].value = e.target.value;
    return this.setState({inputs: newInputs});
  }

  sendMessage = () => {
    let values = {};
    this.state.inputs.map(input => {

      values[input.name] = input.value;
    })
  }

  render() {
    const { text, inputs, error } = this.state;
    const areFieldsFilled = inputs.filter(input => input.value !== "").length === 3;
    return <div>
      form
      { inputs.map(input => {
        return <ContactInput
          key={input.id}
          index={input.id}
          name={input.name}
          type={input.type}
          placeholder={input.placeholder}
          title={input.title}
          value={input.value}
          error={input.error}
          handleChange={this.inputsHandleChange}
        />
      }) }
      <button type='button' onClick={this.sendMessage} disabled={areFieldsFilled ? "" : "disabled"}>{ text.button_send }</button>
      { error ? <p>{error}</p> : undefined }
    </div>;
  }
}

export default ContactForm;
