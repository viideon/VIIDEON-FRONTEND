const PROFILE_REQUEST: string = "PROFILE_REQUEST";
const PROFILE_SUCCESS: string = "PROFILE_SUCCESS";
const PROFILE_FAILURE: string = "PROFILE_FAILURE";

export const types = {
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAILURE
};
export interface UserProfile {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  mobileNumber: string;
  timeZone: string;
  businessPhone: string;
  webAddress: string;
  title: string;
  affiliateId: string;
}
export interface ProfileState {
  user?: UserProfile;
  success?: string;
  loading?: boolean;
  error?: boolean;
  errorMessage?: string;
}

export interface ProfileAction {
    type: typeof PROFILE_REQUEST,
    payload: UserProfile
}