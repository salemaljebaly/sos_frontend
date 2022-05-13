// --------------------------------------------------- //

import { Role } from "../../utils/enum/role.enum";

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
    iat: 1650657067;
    role: Role;
    id: number;
    access_token: string;
  }

// --------------------------------------------------- //
// return user from redux state
export interface UserState {
    user: UserModelFromToken | null;
    isError: boolean;
    isSucces: boolean;
    isLoading: boolean;
    message: string[] | string;
  }
  // --------------------------------------------------- //