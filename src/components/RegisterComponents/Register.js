import React from "react";
import {UserContext} from "../../context";
import text from "../../assets/texts/register.json";
import UserModule from "../../UserModule";
import dataValidation from "../../dataValidation";

class Register extends React.Component{
  static contextType = UserContext;
  lang = this.context.language
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.context.language !== this.lang){
      this.lang = this.context.language
      this.setState({text: text[this.context.language]})
    }
  }

  state = {
    text: text[this.lang],
    values: {},
    errors: {},
    apiError: undefined,
    redirect: false,
    loading: false
  }

  setError = (name, error) => {
    const oldErrors = this.state.errors;
    oldErrors[name] = this.state.text.errors[name][error];
    return this.setState({errors: oldErrors})
  }

  handleChange = (e) => {
    let resetError = this.state.errors;
    resetError[e.target.name] = undefined; // Clear current field errors
    this.setState({errors: resetError});

    if (!e.target.value){ // if the entry is empty
      return this.setError(e.target.name, 'empty');
    }

    switch (e.target.name){ // Depending on the field user is currently typing
      case "username":
        const username = e.target.value
        if (username.indexOf(' ') >= 0 || username.length < 5){ // If too short and has a space
          this.setError(e.target.name, 'not_valid');
        }
        break;
      case "password":
        if (!dataValidation.passwordField(e.target.value)) {
          this.setError(e.target.name, "not_valid");
        }
        break;
      case "confirmPassword":
        if(this.state.values.password !== e.target.value){
          this.setError(e.target.name, "not_same");
        }
        break;
      case "email":
        if (!dataValidation.emailField(e.target.value)) {
          this.setError(e.target.name, "not_valid");
        }
        break;
      default:
    }

    let newInputs = this.state.values;
    newInputs[e.target.name]= e.target.value
    this.setState({values: newInputs});
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    this.setState({errors: {}, loading: true})

    if (Object.keys(this.state.errors).length === 0){
      await UserModule.registerUser(this.state.values).then(r => {
        this.setState({loading: false, redirect: true})
      }).catch(error => { // FAIRE CA
        this.setState({loading: false})
        switch (error.message){
          case '401':
            this.setState({apiError: this.state.text.user_not_found_error});
            break;
          default:
            this.setState({apiError: this.state.text.api_error});
        }
      })
    }
  }

  render() {
    const { text, errors, apiError, loading } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <p>{loading ? 'loading' : undefined}</p>
        {text.inputs.map(input => {
          return (
            <label key={input.id}>
              {input.label}
              <input
                placeholder={input.placeholder}
                name={input.name}
                onChange={this.handleChange}
                type={input.type}
              />
              <p>{errors[input.name]}</p>
            </label>
          )
        })}
        <button type='submit'>{text.submit}</button>
        <p>{apiError ? apiError : undefined}</p>
      </form>
    );
  }
}

export default Register;
