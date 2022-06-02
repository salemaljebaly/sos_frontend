import axios from "axios";
import jwtDecode from "jwt-decode";
import { ReportsModel } from "./reportsModel";

const API_URL = process.env.REACT_APP_BASE_URL
const path = "report";

// Register citizen
const add = async (data: ReportsModel, access_token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  const response = await axios.post(API_URL + path, data, config);

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
  let data: ReportsModel[];
  if (response.data) {
    data = response.data;
    return data;
  }
  return response.data;
};
// count all
const countAll = async (access_token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  const response = await axios.get(API_URL + path + '/count', config);
  return response.data;
};

// update user from database
const updateById = async (
  access_token: string,
  id: number,
  data: Partial<ReportsModel>
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  const response = await axios.patch(API_URL + path + "/" + id, data, config);
  const returnReport = findByID(access_token, id);
  return returnReport;
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
  countAll
};

export default authService;
