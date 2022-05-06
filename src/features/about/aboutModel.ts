// --------------------------------------------------- //
// user model require field
export interface AboutModel {
  id?: number;
  key: string;
  value: string;

}

// --------------------------------------------------- //
// return user from redux state
export interface AboutState {
  Abouts: AboutModel[] | null | [];
  singleAbout : Partial<AboutModel> | null;
  isError: boolean;
  isSucces: boolean;
  isLoading: boolean;
  processDone : boolean;
  message: string[] | string;
}
