import React from "react";

class ArticleDisplay extends React.Component{
  state = {
    article: this.props.article
  }

  static getDerivedStateFromProps(props, state){
    return state.article = props.article
  }

  render() {
    const { article } = this.state;
    return (
      <div>
        {article.title}
      </div>
    );
  }
}

export default ArticleDisplay;
