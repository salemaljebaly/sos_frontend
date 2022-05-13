import axios from "axios";
import jwtDecode from "jwt-decode";
import { AboutModel } from "./aboutModel";

const API_URL = "http://localhost:4000/";
const path = "about";

// Register citizen
const add = async (data: AboutModel, access_token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }; 

  const response = await axios.post(API_URL + path, data, config);

  return response.data;
};
// get all
const getAll = async  (access_token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }; 

  const response = await axios.get(API_URL + path, config);
  let data: AboutModel[];
  if (response.data) {
    data = response.data;
    return data;
  }
  return response.data;
};

// update user from database
const updateById = async (
  access_token: string,
  id: number,
  data: Partial<AboutModel>
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }; 
  const response = await axios.patch(API_URL + path + "/" + id, data, config);
  const retrunCitizenData = findByID(access_token, id);
  return retrunCitizenData;
};

// update user from database
const findByID = async (access_token: string,id: number) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }; 

  const response = await axios.get(API_URL + path + "/" + id, config);

  return response.data;
};

// delete user from database
const deleteById = async (access_token: string, id: number) => {  
  const config = {
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
}; 
  const response = await axios.delete(API_URL + path + "/" + id, config);

  return response.data;
};

const authService = {
  add,
  getAll,
  deleteById,
  updateById,
  findByID,
};

export default authService;
