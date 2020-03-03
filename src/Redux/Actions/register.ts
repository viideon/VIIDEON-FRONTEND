import {types, RegisterAction, User} from "../Types/register";


export function registerUser(user: User): RegisterAction  {
  return {
    type : types.REGISTRATION_REQUEST,
    payload: user
  };
}


