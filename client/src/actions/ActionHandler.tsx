import axios from 'axios';
const baseUrl = 'http://localhost:5050/api';


class ActionHandler{
    saveUser(data: any) {
        return axios.post(baseUrl+'/register', data);
    }

    getAllUsers() {
        return axios.get(baseUrl+'/users');
    }

    adminLogin(data: any){
        return axios.post(baseUrl+'/auth', data);
    }
}

export default new ActionHandler();