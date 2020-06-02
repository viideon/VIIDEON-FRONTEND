import { types } from "../Types/connection";

const profileReducer = (state: any = {}, action: any) => {
    switch (action.type) {
        case types.ADD_CONTACT:
            return {
                ...state,
                loading: true
            }
        case types.ADD_CONTACT_SUCCESS:
            return {
                ...state,
                loading: false,
                contacts: [...state.contacts, action.payload]
            };
        case types.ADD_CONTACT_FAILURE: {
            return {
                ...state,
                loading: false,
            }
        }
        default: {
            return state;
        }
    }
};

export default profileReducer;
