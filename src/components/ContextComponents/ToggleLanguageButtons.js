import React from "react";
import {UserContext} from "../../context";

class ToggleLanguageButtons extends React.Component{
  static contextType = UserContext;


  render() {
    return (
      <div>
        <UserContext.Consumer>
          {({toggleLanguage}) => (
            <button onClick={() => toggleLanguage('en')}>
              Anglais
            </button>
          )}
        </UserContext.Consumer>
        <UserContext.Consumer>
          {({toggleLanguage}) => (
            <button onClick={() => toggleLanguage('fr')}>
              Francais
            </button>
          )}
        </UserContext.Consumer>
      </div>
    );
  }
}

export default ToggleLanguageButtons;
