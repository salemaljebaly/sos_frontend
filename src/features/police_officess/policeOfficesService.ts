import axios from "axios";
import jwtDecode from "jwt-decode";
import { PolicOfficeModel } from "./policeOfficesModel";

const API_URL = "http://localhost:4000/";
const path = "police-office";

// Register citizen
const add = async (data: PolicOfficeModel, access_token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  const response = await axios.post(API_URL + path, data, config);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};
// get all
const getAll = async (access_token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  const response = await axios.get(API_URL + path, config);
  let data: PolicOfficeModel[];
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
  data: Partial<PolicOfficeModel>
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
const findByID = async (access_token: string, id: number) => {
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
