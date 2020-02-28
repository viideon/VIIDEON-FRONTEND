import * as constants from './constants';
export const getEvents = () => {
  return { type: constants.GET_EVENTS };
};

export const getSingleEvent = (id: any) => {
  return { type: constants.GET_SINGLE_EVENT, payload: id };
};

export const getApplicants = () => {
  return { type: constants.GET_APPLICANTS };
};

export const getArtists = () => {
  return { type: constants.GET_ARTISTS };
};
export const getPortfolios = () => {
  return { type: constants.GET_PORTFOLIOS };
};

export const signupUser = (user: object) => {
  return { type: constants.SIGNUP, payload: user };
};

export const loginUser = (user: object) => {
  return { type: constants.LOGIN, payload: user };
};

export const getProjects = () => {
  return { type: constants.GET_PROJECTS, };
}