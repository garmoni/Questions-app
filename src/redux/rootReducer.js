import { combineReducers } from "redux";
import { quastionReducer } from "./quastionReducer"

export const rootReducer = combineReducers({
    quastions: quastionReducer
})