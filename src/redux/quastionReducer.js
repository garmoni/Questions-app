import { FETCH_DATA, GET_ANSWERS, TITLE_ANSWERS, IS_LOADING, CURRENT_PAGE, PAGE_SIZE, SORT_TYPE, ORDER_TYPE, SEARCH_DATA } from "./types"

const initialState = {
    questions: [],
    answers: [],
    title: '',
    loading: false,
    currentPage: 1,
    pageSize: 20,
    nameSort: 'activity',
    orderBy: 'desc',
    search: ''
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
        case CURRENT_PAGE:
            return { ...state, currentPage: action.payload }
        case PAGE_SIZE:
            return { ...state, pageSize: action.payload }
        case SORT_TYPE:
            return { ...state, nameSort: action.payload }
        case ORDER_TYPE:
            return { ...state, orderBy: action.payload }
        case SEARCH_DATA:
            return { ...state, search: action.payload }
        default: return state
    }    
}
