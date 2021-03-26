import React from "react";
//import Action from '../../actions/ActionHandler';

class Registration extends React.Component<any, any>{
   
    dataConfig: any = {};

    mySubmitHandler = event =>{
        event.preventDefault();
        this.dataConfig = {
            name: this.state.name,
            userName: this.state.userName,
            password: this.state.password,
            dob: this.state.dob,
            gender: this.state.gender,
            image: this.state.image
          };
          console.log(this.dataConfig);
          this.submitRegister(this.dataConfig);
    }
    changeHandler= e =>{
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state.gender);
    }
    constructor(props:any){
        super(props);
        this.state ={
            name: '',
            userName: '',
            password: '',
            dob: '',
            gender: '',
            image: '',
            error: {}
        }
        this.mySubmitHandler =this.mySubmitHandler.bind(this);
        this.changeHandler =this.changeHandler.bind(this);
    }
    componentDidMount(){}
    submitRegister(data: any) {
        let formData = new FormData();
        formData.append('name',this.state.name);
        formData.append('userName',this.state.userName);
        formData.append('password',this.state.password);
        formData.append('dob',this.state.dob);
        formData.append('gender',this.state.gender);
        formData.append('image',this.state.image);
        // Action.saveUser(data).then(res=>{
        //     console.log(res);
        // })
        const url = 'http://localhost:5050/api/register';
        fetch(url, {
            mode: 'no-cors',
            method: 'POST',
            body: formData
        })
            .then(response => console.log('Submitted successfully :'+response))
            .catch(error => console.log('Form submit error', error))
    }
    render(){
        return(
            <div className="container">
                <h2>Registration</h2>
                <div className="text-info">
                    <form className="form-group" onSubmit={this.mySubmitHandler} id="regForm">
                        <div className="col-9 p-1">
                            <div className="row">
                                <div className="col-4 mr-0 text-right">
                                <label htmlFor="name">Name</label>
                                </div>
                                <div className="col-8 ml-0 pl-0">
                                <input type="text" onChange={this.changeHandler} className="form-control" name="name" id="name"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-9 p-1">
                            <div className="row">
                                <div className="col-4 mr-0 text-right">
                                <label htmlFor="userName">User Name</label>
                                </div>
                                <div className="col-8 ml-0 pl-0">
                                <input type="text" onChange={this.changeHandler} className="form-control" name="userName" id="userName"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-9 p-1">
                            <div className="row">
                                <div className="col-4 mr-0 text-right">
                                <label htmlFor="password">Password</label>
                                </div>
                                <div className="col-8 ml-0 pl-0">
                                <input type="password" onChange={this.changeHandler} className="form-control" name="password" id="password"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-9 p-1">
                            <div className="row">
                                <div className="col-4 mr-0 text-right">
                                <label htmlFor="dob">DOB</label>
                                </div>
                                <div className="col-8 ml-0 pl-0">
                                <input type="date" onChange={this.changeHandler} pattern="yyyy-MM-dd"  className="form-control" name="dob" id="dob"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-9 p-1">
                            <div className="row">
                                <div className="col-4 mr-0 text-right">
                                <label htmlFor="gender">Gender</label>
                                </div>
                                <div className="col-8 ml-0 pl-0">
                                <select className="form-control" onChange={this.changeHandler} name="gender" id="gender">
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-9 p-1">
                            <div className="row">
                                <div className="col-4 mr-0 text-right">
                                <label htmlFor="image">Image</label>
                                </div>
                                <div className="col-8 ml-0 pl-0">
                                <input type="file" onChange={this.changeHandler} className="form-control p-1 pb-1 mb-1" name="image" id="image"/>
                                </div>
                            </div>
                        </div>

                        <div className="col-9 p-1">
                                <input type="submit" value="Save" className="btn btn-info p-2 m-2"/>
                                <input type="reset" value="Reset" className="btn btn-danger p-2 m-2"/>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}

export default Registration;