import axios from "axios";
import jwtDecode from "jwt-decode";
import { LoginModel, UserModel, UserModelFromToken, UsersModel } from "./userModel";

const API_URL = 'http://localhost:4000/'
const path : string = 'users';
// Register user
const register = async (userData:UserModel) => {
    const response = await axios.post(API_URL + 'users', userData);

    // if(response.data){
    //     localStorage.setItem('user', JSON.stringify(response.data));
    // }

    return response.data;
}

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

// get all user
const getAllUsers = async (access_token: string) => {
  const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  const response = await axios.get(API_URL + path, config);
  let users : UsersModel[];
  if(response.data){
      users  = response.data
      return users;
      
  }
  return response.data;
}

// get count user
const countAll = async (access_token: string) => {
  const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  const response = await axios.get(API_URL + path + '/count', config);
  return response.data;
}


// update user from database
const updateUserById  = async (access_token: string, id : number, userData:Partial<UserModel>) => {
    
    const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    const response = await axios.patch(API_URL + path+'/' + id,userData, config);
    const retrunUserData  = findUserByID(access_token, id);
    return retrunUserData;
}

// update user from database
const findUserByID  = async (access_token: string, id : number) => {
    
    const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    const response = await axios.get(API_URL + path + '/' + id, config);
    
    return response.data;
}

// delete user from database
const deleteUserById  = async (access_token: string, id : number) => {
    
    const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    const response = await axios.delete(API_URL + path + '/' + id, config);
    
    return response.data;
}

// delete user from database
const searchInUsers  = async (access_token: string, keyword : string) => {
    
  const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  const response = await axios.get(API_URL + path + '/' + keyword, config);
  
  // it retrun array of users 
  return response.data;
}

// delete user from database
// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    getAllUsers,
    deleteUserById,
    updateUserById, 
    findUserByID,
    searchInUsers,
    logout,
    countAll
}

export default authService;