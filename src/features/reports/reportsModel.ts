// --------------------------------------------------- //

import { CitizenModel, CitizensModel } from "../citizens/citizensModel";

// report model
export interface ReportsModel {
  id?:             number;
  desc:           string;
  type:           string;
  state:          string;
  createdAt?:      Date;
  updateAt?:       Date;
  longitude:      string; // current report location
  latitude:       string; // current report location
  reportFilePath: string;
  fileType:       string;
  reporter:       ReporterModel;
}
// --------------------------------------------------- //
// reporter model
export interface ReporterModel {
  id:        number;
  firstName: string;
  lastName:  string;
  username:  string;
  email:     string;
  phone:     string;
  password:  string;
  isActive:  boolean;
  createdAt?: Date;
  city:      string;
  longitude: string; // citizen location registered
  latitude:  string; // citizen location registered
  reporter : CitizensModel | null;
}
// --------------------------------------------------- //
// reportState model
export interface ReportState{
  Reports: ReportsModel[]  | [] ; 
  singleReport : Partial<ReporterModel> | null;
  isError: boolean;
  isSucces: boolean;
  isLoading: boolean;
  processDone : boolean;
  message: string[] | string;
  count : number;
}
// --------------------------------------------------- //