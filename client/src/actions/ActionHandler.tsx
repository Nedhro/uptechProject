import axios from 'axios';
const baseUrl = 'http://localhost:5050/api';


class ActionHandler{
    saveUser(data: any) {
        return axios.post(baseUrl+'/register', data);
    }

    findByUsername(userName: string){
        return axios.get(baseUrl+'/user/'+userName);
    }

    updateUser(id:any){
        return axios.patch(baseUrl+'/user/'+id);
    }

    deleteUser(id:any){
        return axios.delete(baseUrl+'/user/'+id);
    }

    getAllUsers() {
        return axios.get(baseUrl+'/users');
    }

    adminLogin(data: any){
        return axios.post(baseUrl+'/auth', data);
    }
}

export default new ActionHandler();