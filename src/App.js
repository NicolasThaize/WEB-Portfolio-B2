import React from 'react'
import {Helmet, HelmetProvider} from 'react-helmet-async';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import {UserContext} from './context';
import './assets/css/global.min.css';


import Home from "./components/HomeComponents/Home";
import Navbar from "./components/NavbarComponents/Navbar";

import UserModule from "./UserModule";
import Login from "./components/LoginComponents/Login";
import Register from "./components/RegisterComponents/Register";
import axiosInstance from "./axiosApi";


class App extends React.Component{

  /**
   * Set the language chosen, store info in localstorage
   * @param language
   */
  toggleLanguage = (language) => {
    if (language === this.state.language){return;}
    localStorage.setItem("nthaize_language", language);
    this.setState(() => ({
      language: localStorage.getItem("nthaize_language")
    }))
  }

  loginUser = (refresh, access) => {
    axiosInstance.defaults.headers['Authorization'] = "JWT " + access;
    localStorage.setItem('nthaize_access_token', access);
    localStorage.setItem('nthaize_refresh_token', refresh);
    this.setState({isLogged: true});
  }

  logoutUser = async () =>{
    await axiosInstance.post('/blacklist/', {
      "refresh_token": localStorage.getItem("nthaize_refresh_token")
    });
    localStorage.removeItem('nthaize_access_token');
    localStorage.removeItem('nthaize_refresh_token');
    axiosInstance.defaults.headers['Authorization'] = null;
    this.setState({isLogged: false});
  }

  state = {
    isLogged: !!localStorage.getItem("nthaize_refresh_token"),
    language: localStorage.getItem("nthaize_language") ? localStorage.getItem("nthaize_language") : 'fr',
    toggleLanguage: this.toggleLanguage,
    loginUser: this.loginUser,
    logoutUser: this.logoutUser
  }

  /**
   * If the user is logged when comming on app sets isLogged if token is stored
   * Change the isLogged state which is supposed to be passed to
   * child components who needs a custom display when logged or not
   */
  componentDidMount() {
    const isLogged = !!localStorage.getItem("nthaize_refresh_token");
    this.setState({isLogged: isLogged} , () => {
      if (this.state.isLogged){
        //const user = UserModule.prototype.getUserData();
        //this.setState({isAdmin: user.admin})
      }
    });
  }

  render() {
    return (
      <UserContext.Provider value={{...UserModule.getUserData(), ...this.state}}>
        <Router>
          <HelmetProvider>
            <main>
              <Helmet>
                {/*Tab Infos*/}
                <title>Nicolas THAIZE</title>
                <link rel="icon" href="/img/favicon.ico"/>
                {/* SEO */}
                <meta charSet="UTF-8"/>
                <meta name="keywords" content="HTML, CSS, JavaScript, Nicolas, thaize, nicolasthaize, developer, web, bulma, wordpress, linux, development,React, Sass, Gulp"/>
                <meta name="description" content="Nicolas THAIZE student in IT in PACA France."/>
                <meta name="author" content="Nicolas THAIZE"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
              </Helmet>
              <div className="App">
                <Navbar/>
                <Route exact path="/" component={Home} />

                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
              </div>
            </main>
          </HelmetProvider>
        </Router>
      </UserContext.Provider>
    );
  }
}

export default App;
