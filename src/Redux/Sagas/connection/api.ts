import API from "../../../lib/Api";

export async function addContact(contact: any) {
  return API.post("/contact/create", contact);
}
