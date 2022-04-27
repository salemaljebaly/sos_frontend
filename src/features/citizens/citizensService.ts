import axios from "axios";
import jwtDecode from "jwt-decode";
import { LoginModel, CitizenModel, CitizenModelFromToken, CitizensModel } from "./citizensModel";

const API_URL = 'http://localhost:4000/';
const path = 'citizens';

// Register user
const register = async (userData:CitizenModel) => {
    const response = await axios.post(API_URL + path , userData);

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
}

// login user
const login = async (userData:LoginModel) => {
    const response = await axios.post(API_URL + path + 'auth', userData);
    let user : CitizenModelFromToken;
    if(response.data){
        user  = jwtDecode(response.data['access_token']);
        user.access_token = response.data['access_token'];
        localStorage.setItem('user', JSON.stringify(user));

        return user;
    }
    return response.data;
}

// get all user
const getAllCitizens = async (access_token: string) => {
    const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    const response = await axios.get(API_URL + path , config);
    let users : CitizenModel[];
    if(response.data){
        users  = response.data
        return users;
        
    }
    return response.data;
}


// update user from database
const updateCitizenById  = async (access_token: string, id : number, userData:Partial<CitizenModel>) => {
    
    const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    const response = await axios.patch(API_URL + path + '/' + id,userData, config);
    const retrunCitizenData  = findCitizenByID(access_token, id);
    return retrunCitizenData;
}

// update user from database
const findCitizenByID  = async (access_token: string, id : number) => {
    
    const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    const response = await axios.get(API_URL + path + '/' + id, config);
    
    return response.data;
}

// delete user from database
const deleteCitizenById  = async (access_token: string, id : number) => {
    
    const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    const response = await axios.delete(API_URL + path + '/' + id, config);
    
    return response.data;
}

// delete user from database
const searchInCitizens  = async (access_token: string, keyword : string) => {
    
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
    getAllCitizens,
    deleteCitizenById,
    updateCitizenById, 
    findCitizenByID,
    searchInCitizens,
    logout
}

export default authService;