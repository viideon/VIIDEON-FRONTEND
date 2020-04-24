import { types } from "../Types/drawer";

const drawerReducer = (state = { drawer: true }, action: any) => {
    switch (action.type) {
        case types.TOGGLE_DRAWER:
            return { ...state, drawer: !state.drawer }
        default: {
            return state;
        }
    }
};
export default drawerReducer;
