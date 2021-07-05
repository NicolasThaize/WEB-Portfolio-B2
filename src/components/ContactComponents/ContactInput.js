import React from "react";
import { UserContext } from "../../context";
import ContactTextarea from "./ContactTextarea";

class ContactInput extends React.Component {
  static contextType = UserContext;

  state = {
    title: this.props.title,
    name: this.props.name,
    placeholder: this.props.placeholder,
    type: this.props.type,
    index: this.props.index - 1,
    error: this.props.error
  };

  static getDerivedStateFromProps(props, state) {
    state.title = props.title
    state.name = props.name
    state.placeholder = props.placeholder
    state.index = props.index - 1
    state.error = props.error
    return state.type = props.type
  }

  render() {
    const { title, name, placeholder, type, index, error } = this.state;
    if (type !== 'textarea') {
      return (
        <label>
          {title}
          <input onChange={(e) => this.props.handleChange(e, index)} name={name} type={type} placeholder={placeholder}/>
          {error ? <p>{error}</p> : undefined}
        </label>
      );
    } else {
      return <ContactTextarea handleChange={this.props.handleChange} name={name} placeholder={placeholder} title={title} index={index} error={error}/>
    }

  }
}

export default ContactInput;
