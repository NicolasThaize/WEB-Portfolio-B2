import React from "react";
import {UserContext} from "../../../../context";
import text from "../../../../assets/texts/articles/writeComment.json";


class ArticlesListReplies extends React.Component{
  static contextType = UserContext;
  lang = this.context.language
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.context.language !== this.lang){
      this.lang = this.context.language
      this.setState({text: text[this.context.language]})
    }
  }

  static getDerivedStateFromProps(props, state){
    return state.replies = props.replies
  }

  state = {
    text: text[this.lang],
    replies: this.props.replies
  }

  render() {
    const { text, replies } = this.state;
    return (
      <div>
        Composant d'affichage des réponses
        { replies.map(reply => (
          <div key={reply.id} style={{marginLeft: "10px"}}>
            {reply.reply_author.username}: {reply.reply_text}
          </div>
        ))}
      </div>
    );
  }
}

export default ArticlesListReplies;
