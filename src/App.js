import React from 'react'
import {Helmet, HelmetProvider} from 'react-helmet-async';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import {UserContext} from './context';
import './assets/css/global.min.css';


import Home from "./components/Home";


function App() {
  return (
    <UserContext.Provider value={{user: "lol"}}>
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
                <Route exact path="/" component={Home} />
              </div>
          </main>
        </HelmetProvider>
      </Router>
    </UserContext.Provider>
);
}

export default App;
