import API from "../../../lib/Api";

export function registerApi(user: any) {
   return API.post("/user/register", user);
}