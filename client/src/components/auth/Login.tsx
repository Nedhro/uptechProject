import React from 'react';
import Action from '../../actions/ActionHandler';
import {SET_CURRENT_USER } from '../../actions/types';
class Login extends React.Component<any, any>{

    dataConfig: any = {};

    mySubmitHandler = (event: any) => {
        event.preventDefault();
         this.dataConfig = {
            userName: this.state.userName,
            password: this.state.password
          };
          this.submitLogin(this.dataConfig);
    }
    changeHandler= e =>{
        this.setState({ [e.target.name]: e.target.value });
    }

    constructor(props: any) {
        super(props);
        this.state = {
            userName:'',
            password: '',
            error: {},
            isLoaded: false,
            showing: true
        };
        this.mySubmitHandler = this.mySubmitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
      }
      componentDidMount(){
      }

      submitLogin(data:any){
          Action.adminLogin(data).then(res =>{
              console.log(res);
              if(res.data.status === 200){
                this.props.history.push('/admin');
                localStorage.setItem('username', res.data.username);
                this.setCurrentUser(res.data.username);
              }
          })
      }
      // Set logged in user
  setCurrentUser = decoded => {
    return {
      type: SET_CURRENT_USER,
      payload: decoded
    };
  };

    render(){
        const {showing} =this.state;
        const refreshPage = ()=>{
            if(localStorage.getItem('username') === ''){
                this.setState({showing: true});
            }else{
                this.setState({showing: false});
                this.props.history.push('/admin');
                window.location.reload();
            }
        }
       
        return(
            <div className="container" >
                <div style={{ display: showing ? "block" : "none" }}> 
                <h2>Login</h2>
                <form className="form-group" onSubmit={this.mySubmitHandler}>
                    <div className="col-12">
                        <label className="p-1 m-1">Username</label>
                        <input className="text p-1 m-1" type="text"  onChange={this.changeHandler} placeholder="User name" id="userName" name="userName"/>
                    </div>
                    <div className="col-12">
                        <label className="p-1 m-1">Password</label>
                        <input className="text p-1 m-1" type="password"  onChange={this.changeHandler} placeholder="Password" id="password" name="password"/>
                    </div>
                    <div className="col-12">
                        <input type="submit" onClick={refreshPage} className="btn btn-primary m-1 p-1" value="Login"/>
                        <input type="reset" className="btn btn-danger m-1 p-1" value="Reset"/>
                    </div>
                </form>
                </div>
                <div style={{ display: showing ? "none" : "block" }}>
                <h2 className="text-success"> Login Successful</h2>
                </div>
            </div>
        );
    }
}

export default Login;