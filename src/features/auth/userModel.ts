import { Role } from "../../utils/enum/role.enum";
import { ErrorResponse } from "./ErrorResponse";

export interface UserModel {
  id: number;
  email: string;
  firstName: string;
  isActive: boolean;
  lastName: string;
  password: string;
  role: string;
  username: string;
}

export interface LoginModel {
  username: string;
  password: string;
}

export interface UserModelFromToken {
  username: string;
  firstname: string;
  iat: 1650657067;
  role: Role;
  userId: number;
  access_token: string;
}

export interface UserState {
  user: UserModelFromToken | null;
  isError: boolean;
  isSucces: boolean;
  isLoading: boolean;
  message: string;
}

export interface Users {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
  updateAt: Date;
  role: string;
}
