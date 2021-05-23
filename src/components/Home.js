import React from "react";
import {UserContext} from '../context';

class Home extends React.Component {
  static contextType = UserContext;

  componentDidMount() {
    console.log(this.context)
  }

  render() {
    return (
      <div>
        home
      </div>
    );
  }
}

export default Home;
