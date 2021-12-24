import { FETCH_DATA } from "./types"

const initialState = {
    questions: [],
}

export const quastionReducer = (state = initialState, action) => {
    switch (action.type){
        case FETCH_DATA: 
        return { ...state, questions: action.payload }
        default: return state
    }    
}
