import React from "react";
import { UserContext } from "../../context";
import ContactInput from "./ContactInput";

class ContactForm extends React.Component {
  static contextType = UserContext;

  state = {
    inputs: this.props.inputs,
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
    newInputs[index].value = e.target.value;
    this.setState({inputs: newInputs});
    console.log(this.state.inputs)
  }

  render() {
    const { inputs } = this.state;
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
          handleChange={this.inputsHandleChange}
        />
      }) }
    </div>;
  }
}

export default ContactForm;
