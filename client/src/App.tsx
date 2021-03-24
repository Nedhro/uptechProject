import React from 'react';
import logo from './programming.png';
import './App.scss';
import AppHeader from './components/layout/header/AppHeader';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <AppHeader/>
      <footer>
        <div className="container-fliud text-center footer">
          <p>All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
