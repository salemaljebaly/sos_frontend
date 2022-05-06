// --------------------------------------------------- //
// user model require field
export interface PolicOfficeModel {
  id?: number;
  office_name: string,
  office_city: string,
  longitude: string,
  latitude: string

}


// --------------------------------------------------- //
// return user from redux state
export interface PoliceOfficesState {
  PoliceOffices: PoliceOfficesModel[] | [];
  singleOffice : Partial<PoliceOfficesModel> | null;
  isError: boolean;
  isSucces: boolean;
  isLoading: boolean;
  processDone : boolean;
  message: string[] | string;
}

// --------------------------------------------------- //
// user all fields
export interface PoliceOfficesModel {
  id: number;
  office_name: string,
  office_city: string,
  longitude: string,
  latitude: string
  createdAt?: Date;
  updateAt?: Date;
}
// --------------------------------------------------- //
