import { createAction } from "../../utils/firebase/reducer/reducer.util";
import { USER_ACTION_TYPES } from "./user.reducer";

export const setCurrentUser = (user) => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);