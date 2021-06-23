import React from "react";
import {UserContext} from "../../../context";
import text from "../../../assets/texts/articles/writeComment.json";


class ArticlesWriteReply extends React.Component{
  static contextType = UserContext;
  lang = this.context.language
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.context.language !== this.lang){
      this.lang = this.context.language
      this.setState({text: text[this.context.language]})
    }
  }

  static getDerivedStateFromProps(props, state){
    return state.article = props.article
  }

  state = {
    text: text[this.lang],
    article: this.props.article
  }

  render() {
    const { text } = this.state;
    return (
      <div>
        <input type='text' placeholder="here reply"/>
        <button>Envoyer</button>
        <button>Annuler</button>
      </div>
    );
  }
}

export default ArticlesWriteReply;
