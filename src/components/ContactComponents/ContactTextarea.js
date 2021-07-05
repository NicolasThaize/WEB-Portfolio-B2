import React from "react";
import { UserContext } from "../../context";

class ContactTextarea extends React.Component {
  static contextType = UserContext;

  state = {
    title: this.props.title,
    name: this.props.name,
    placeholder: this.props.placeholder,
    index: this.props.index
  };

  static getDerivedStateFromProps(props, state) {
    state.title = props.title
    state.name = props.name
    state.placeholder = props.placeholder
    return state.index = props.index
  }

  render() {
    const { title, name, placeholder, index } = this.state;
    return (
      <label>
        {title}
        <textarea name={name} placeholder={placeholder} onChange={(e) => this.props.handleChange(e, index)}/>
      </label>
    )
  }
}

export default ContactTextarea;
