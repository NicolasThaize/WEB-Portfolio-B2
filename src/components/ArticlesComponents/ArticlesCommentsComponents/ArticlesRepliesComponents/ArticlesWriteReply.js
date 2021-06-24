import React from "react";
import {UserContext} from "../../../../context";
import text from "../../../../assets/texts/articles/writeComment.json";
import CommentsService from "../../../../CommentsService";


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
    article: this.props.article,
    userInput: '',
    comment: this.props.comment
  }

  handleChange = (e) => {
    this.setState({userInput: e.target.value})
  }

  sendReply = () => {
    CommentsService.addReply(this.state.comment, {reply_text: this.state.userInput}).then(r => {
      this.props.reloadComments(r)
    })
  }

  resetInput = () => {
    this.setState({userInput: ''})
  }

  render() {
    const { text, userInput } = this.state;
    return (
      <div>
        <input type='text' placeholder="here reply" value={userInput} onChange={this.handleChange}/>
        <button onClick={this.sendReply}>Envoyer</button>
        <button onClick={this.resetInput}>Annuler</button>
      </div>
    );
  }
}

export default ArticlesWriteReply;
