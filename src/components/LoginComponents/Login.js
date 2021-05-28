import React from "react";
import {UserContext} from "../../context";
import text from "../../assets/texts/login.json";
import UserModule from "../../UserModule";
import {Redirect} from "react-router-dom";

class Login extends React.Component{
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
    loading: false,
    tokens: {}
  }

  handleChange = (e) => {
    let newInputs = this.state.values;
    newInputs[e.target.name]= e.target.value
    this.setState({values: newInputs});
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    this.setState({errors: {}, loading: true})
    const newErrors = {};
    for (const input of e.target){
      if (!input.value && input.tagName === "INPUT"){
        newErrors[input.name] = this.state.text[input.name + '_error'] // get the error depending on target name
      }
    }

    if (Object.keys(newErrors).length !== 0){
      this.setState({errors: newErrors})
    } else{
      await UserModule.loginUser(this.state.values).then(r => {
        this.context.loginUser(r.refresh, r.access)
        this.setState({loading: false, redirect: true})
      }).catch(error => {
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
    const { text, errors, apiError, loading, redirect } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        { redirect ? <Redirect to='/'/> : undefined }
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
              <p>{errors[input.name] ? errors[input.name] : undefined}</p>
            </label>
          )
        })}
        <button type='submit'>{text.submit}</button>
        <p>{apiError ? apiError : undefined}</p>
      </form>
    );
  }
}

export default Login;
