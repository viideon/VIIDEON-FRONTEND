import API from "../../../lib/Api";

export async function updateProfileApi(profile: any) {
  return API.patch(`/user/update/${profile.userId}`, profile);
}
