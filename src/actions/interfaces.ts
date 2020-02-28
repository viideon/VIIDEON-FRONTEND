import * as constants from './constants';

interface ILoginResponse {
  user: any,
  token: string
}

export interface getEvents {
  type: constants.GET_EVENTS;
}

export interface getSingleEvent {
  type: constants.GET_SINGLE_EVENT;
  payload: any;
}

export interface getApplicants {
  type: constants.GET_APPLICANTS;
}

export interface getArtists {
  type: constants.GET_ARTISTS;
  payload: any;
}
export interface getPortfolios {
  type: constants.GET_PORTFOLIOS;
}
export interface receivePortfolios {
  type: constants.RECEIVED_PORTFOLIOS;
  payload: object;
}
export interface failedRecievedPortfolios {
  type: constants.FAILED_RECEIVED_PORTFOLIOS,
  payload: string
}

export interface signupUser {
  type: constants.SIGNUP;
  payload: object;
}

export interface signupSuccess {
  type: constants.SIGNUP_SUCCESS;
}

export interface signupFailed {
  type: constants.SIGNUP_FAILED;
  payload?: any;
}

export interface loginUser {
  type: constants.LOGIN;
  payload: object;
}

export interface loginSuccess {
  type: constants.LOGIN_SUCCESS;
  payload: ILoginResponse
}
export interface loginFailed {
  type: constants.LOGIN_FAILED;
  payload: any
}

export interface getProjects {
  type: constants.GET_PROJECTS;

}
export interface receivedProjects {
  type: constants.RECEIVED_PROJECTS,
  payload: any
}
export interface failedReceivedProjects {
  type: constants.FAILED_RECEIVED_PROJECTS,
  payload: any
}

export type Locality =
  | getEvents
  | getSingleEvent
  | getApplicants
  | getArtists
  | getPortfolios
  | receivePortfolios
  | failedRecievedPortfolios
  | getProjects
  | receivedProjects
  | failedReceivedProjects
  | loginUser
  | loginSuccess
  | loginFailed
  | signupSuccess
  | signupFailed
  | signupUser;
