import { FETCH_DATA, GET_ANSWERS, TITLE_ANSWERS, PAGINATION_TYPE } from "./types"

const initialState = {
    questions: [],
    answers: [],
    title: '',
    pagination: {
        rowCount: 1,
        pageCount: 20
    }
}

export const questionReducer = (state = initialState, action) => {
    switch (action.type){
        case FETCH_DATA: 
            return { ...state, questions: action.payload }
        case GET_ANSWERS:
            return { ...state, answers: action.payload }
        case TITLE_ANSWERS:
            return { ...state, title: action.payload }
        case PAGINATION_TYPE:
            return {...state, pagination: action.payload}
        default: return state
    }    
}
