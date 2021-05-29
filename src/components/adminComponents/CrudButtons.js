import React from "react";
import {UserContext} from "../../context";
import text from "../../assets/texts/navbar.json";

class CrudButtons extends React.Component{
  static contextType = UserContext;
  lang = this.context.language
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.context.language !== this.lang){
      this.lang = this.context.language
      this.setState({text: text[this.context.language]})
    }
  }

  state = {
    text: text[this.lang]
  }

  showButton = () => {
    this.props.showFunc();
  }

  modifyButton = () => {
    this.props.modifyFunc();
  }

  deleteButton = () => {
    this.props.deleteFunc();
  }

  render() {
    const { text } = this.state;
    return (
      <div>
        { this.props.showFunc ? <button onClick={this.showButton}>Voir</button> : undefined }
        { this.props.modifyFunc ? <button onClick={this.modifyButton}>Modif</button> : undefined }
        { this.props.deleteFunc ? <button onClick={this.deleteButton}>Supprimer</button> : undefined }
      </div>
    );
  }
}

export default CrudButtons;
