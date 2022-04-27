import { Role } from "../../utils/enum/role.enum";

// --------------------------------------------------- //
// user model require field
export interface CitizenModel {
  id?: number;
  email: string;
  phone: string;
  firstName: string;
  isActive: boolean;
  lastName: string;
  password: string;
  username: string;
  city: string;
  longitude : string;
  latitude: string;

}
// --------------------------------------------------- //
// login model require field
export interface LoginModel {
  username: string;
  password: string;
}

// --------------------------------------------------- //
// extract data from UserModelFromToken
export interface CitizenModelFromToken {
  username: string;
  firstname: string;
  iat: 1650657067;
  role: Role;
  userId: number;
  access_token: string;
}

// --------------------------------------------------- //
// return user from redux state
export interface UserState {
  citizens: CitizensModel[] | Partial<CitizenModel> | null;
  singleCitizen : Partial<CitizenModel> | null;
  isError: boolean;
  isSucces: boolean;
  isLoading: boolean;
  message: string[] | string;
}

// --------------------------------------------------- //
// user all fields
export interface CitizensModel {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  password?: string;
  isActive: boolean;
  createdAt?: Date;
  updateAt?: Date;
  city: string;
  longitude : string;
  latitude: string;
}
// --------------------------------------------------- //
