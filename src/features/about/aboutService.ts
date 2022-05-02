import axios from "axios";
import jwtDecode from "jwt-decode";
import { AboutModel } from "./aboutModel";

const API_URL = "http://localhost:4000/";
const path = "about";

// Register citizen
const add = async (data: AboutModel) => {

  const response = await axios.post(API_URL + path, data);

  return response.data;
};
// get all
const getAll = async () => {

  const response = await axios.get(API_URL + path);
  let data: AboutModel[];
  if (response.data) {
    data = response.data;
    return data;
  }
  return response.data;
};

// update user from database
const updateById = async (
  id: number,
  data: Partial<AboutModel>
) => {
  const response = await axios.patch(API_URL + path + "/" + id, data);
  const retrunCitizenData = findByID(id);
  return retrunCitizenData;
};

// update user from database
const findByID = async (id: number) => {
  const response = await axios.get(API_URL + path + "/" + id);

  return response.data;
};

// delete user from database
const deleteById = async (id: number) => {
  const response = await axios.delete(API_URL + path + "/" + id);

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
