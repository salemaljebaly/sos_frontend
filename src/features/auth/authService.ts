import axios from "axios";
import jwtDecode from "jwt-decode";
import { LoginModel, UserModelFromToken } from "./AuthModel";

const API_URL = 'http://localhost:4000/'

// login user
const login = async (userData:LoginModel) => {
    const response = await axios.post(API_URL + 'auth', userData);
    let user : UserModelFromToken;
    if(response.data){
        user  = jwtDecode(response.data['access_token']);
        user.access_token = response.data['access_token'];
        localStorage.setItem('user', JSON.stringify(user));

        return user;
    }
    return response.data;
}

// delete user from database
// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
    login,
    logout
}

export default authService;