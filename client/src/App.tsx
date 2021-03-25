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
          <p>Copyright &copy; {new Date().getFullYear()} || All right reserved || Nidhro</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
