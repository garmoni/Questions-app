import { combineReducers } from "redux";
import { questionReducer } from "./quastionReducer"

export const rootReducer = combineReducers({
    questions: questionReducer
})