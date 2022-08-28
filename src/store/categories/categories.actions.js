import { createAction } from "../../utils/firebase/reducer/reducer.util";
import { CATEGORIES_ACTION_TYPES } from "./categories.types";

export const setCategoriesMap = (categories) => createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP, categories);