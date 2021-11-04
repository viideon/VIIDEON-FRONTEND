import { put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { types } from "../../Types/connection";
import { addContact as newContact } from "./api";

function* addContact(action: any) {
  try {
    const result = yield newContact(action.payload);
    if (result.status === 201) {
      yield put({
        type: types.ADD_CONTACT_SUCCESS,
        payload: result.data.contact
      });
      toast.info("Contact Added");
    } else {
      yield put({ type: types.ADD_CONTACT_FAILURE });
      toast.error("Failed to Add Contact");
    }
  } catch (error) {
    toast.error(error);
  }
}
// function* getContacts(action:any){
//     try {
//         const result = yield newContact(action.payload);
//         if (result.status === 201) {
//             yield put({ type: types.ADD_CONTACT_SUCCESS, payload: result.data.contact });
//             toast.info("Contact Added");
//         }
//         else {
//             yield put({ type: types.ADD_CONTACT_FAILURE, });
//             toast.error("Failed to Add Contact");
//         }
//     } catch (error) {
//         toast.error(error);
//     }
// }
export function* profileWatcher() {
  yield takeLatest(types.ADD_CONTACT, addContact);
}
