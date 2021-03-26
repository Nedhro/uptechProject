import React from 'react';
import {  BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AdminPanel from '../../admin/AdminPanel';
import Login from '../../auth/Login';
import Registration from '../../auth/Registration';

import '../header/appHeader.scss';
import Home from '../home/Home';
class AppHeader extends React.Component<any,any> {
    localStoreData: any;

    constructor(props: any){
        super(props);
        this.state ={
            localStoreData: ''
        }
    this.logoutUser = this.logoutUser.bind(this);
    }
    logoutUser = () => {
        // Remove from localStorage
        localStorage.removeItem('username');
        this.setState({localStoreData: ''});
      };

componentDidMount(){
    const user = localStorage.getItem('username') === '';
    this.localStoreData = user? '': localStorage?.getItem('username');
    this.setState({localStoreData: this.localStoreData});
}
  
  render(){
      const {localStoreData} = this.state;
      let button, adminButton;
      if(localStoreData === ''){
          button = <Link className="nav-link btn btn-info" to="/login">Login</Link>
      }else{
        button = <button className="btn btn-danger" onClick={this.logoutUser}>Logout</button>
        adminButton = <Link className="nav-link" to="/admin">Admin</Link>
      }
    return (
        <div className="AppHeader text font-weight-bold">
        <Router>
             <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="#">Assessment</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        {adminButton}
                    </li>
                    </ul>
                    <span className="navbar-text">
                        {button}
                    </span>
                </div>
            </nav>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Registration} />
                <Route exact path="/admin" component={AdminPanel} />
            </Switch>
        </Router>
    
        </div>
      );
  }
}


export default AppHeader;
