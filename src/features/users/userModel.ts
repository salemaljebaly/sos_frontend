import { Role } from "../../utils/enum/role.enum";
import { ErrorResponse } from "./ErrorResponse";

// --------------------------------------------------- //
// user model require field
export interface UserModel {
  id?: number;
  email: string;
  firstName: string;
  isActive: boolean;
  lastName: string;
  password: string;
  role: string;
  username: string;
}
// --------------------------------------------------- //
// login model require field
export interface LoginModel {
  username: string;
  password: string;
}

// --------------------------------------------------- //
// extract data from UserModelFromToken
export interface UserModelFromToken {
  username: string;
  firstname: string;
  lastName: string;
  iat: number;
  role: Role;
  id: number;
  access_token: string;
}

// --------------------------------------------------- //
// return user from redux state
export interface UserState {
  users: UsersModel[] | [];
  singleUser : Partial<UsersModel> | null;
  isError: boolean;
  isSucces: boolean;
  isLoading: boolean;
  processDone : boolean;
  message: string[] | string;
  count : number;
}

// --------------------------------------------------- //
// user all fields
export interface UsersModel {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password?: string;
  isActive: boolean;
  createdAt?: Date;
  updateAt?: Date;
  role: string;
}
// --------------------------------------------------- //
