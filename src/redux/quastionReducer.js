import { FETCH_DATA, GET_ANSWERS, TITLE_ANSWERS, IS_LOADING } from "./types"

const initialState = {
    questions: [],
    answers: [],
    title: '',
    loading: false,
}

export const questionReducer = (state = initialState, action) => {
    switch (action.type){
        case FETCH_DATA: 
            return { ...state, questions: action.payload }
        case GET_ANSWERS:
            return { ...state, answers: action.payload }
        case TITLE_ANSWERS:
            return { ...state, title: action.payload }
        case IS_LOADING:
        return { ...state, loading: action.payload }
        default: return state
    }    
}
