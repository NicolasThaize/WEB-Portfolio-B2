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
    comment: this.props.comment,
    loading: false,
    error: undefined
  }

  handleChange = (e) => {
    this.setState({userInput: e.target.value})
  }

  sendReply = async () => {
    this.setState({loading: true})
    await CommentsService.addReply(this.state.comment, {reply_text: this.state.userInput}).then(() => {
      this.setState({loading: false})
      this.props.refreshArticle()
    }).catch(() => {
      this.setState({loading: false})
      this.setState({error: "Error while sending the reply."})
    })
  }

  resetInput = () => {
    this.setState({userInput: ''})
  }

  render() {
    const { text, userInput, loading, error } = this.state;
    return (
      <div>
        <input type='text' placeholder="here reply" value={userInput} onChange={this.handleChange}/>
        {error ? <p>{error}</p> : undefined}
        <button onClick={this.sendReply}>Envoyer</button>
        <button onClick={this.resetInput}>Annuler</button>
        {loading ? <p>Sending</p> : undefined}
      </div>
    );
  }
}

export default ArticlesWriteReply;
