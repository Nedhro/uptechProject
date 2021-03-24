import React from 'react';
import {  BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import '../header/appHeader.scss';

function App() {
  return (
    <div className="AppHeader">
    <Router>
         <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="#">Assessment</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link className="nav-link" to="#">Home <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#">Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#">Users</Link>
                </li>
                </ul>
                <span className="navbar-text">
                    <Link className="nav-link" to="#">Login</Link>
                </span>
            </div>
        </nav>
    </Router>

    </div>
  );
}


export default App;
