import { FETCH_DATA, GET_ANSWERS, TITLE_ANSWERS, IS_LOADING, SORT_TYPE, ORDER_TYPE, SEARCH_DATA } from "./types";

const url = 'https://api.stackexchange.com/2.2/'

export function fetchData() {
    return async (dispatch:any, getState:() => any) =>  {
        const substate = getState().questions
        dispatch({type: IS_LOADING, payload: true})
        const response = await fetch(`${url}search/advanced?page=${substate.currentPage}&pagesize=${substate.pageSize}${substate.search}&order=${substate.orderBy}&sort=${substate.nameSort}&filter=!nKzQUR693x&site=stackoverflow&key=HvkZRI2Sh7NzURDMbtNXhQ((`)
        const json = await response.json()
    
        dispatch({type: FETCH_DATA, payload: json})
        dispatch({type: IS_LOADING, payload: false})
    }
}

export function getAnswers(id:Number) {
    return async (dispatch:any) =>  {
        dispatch({type: IS_LOADING, payload: true})
        const response = await fetch(`${url}questions/${id}/answers?order=desc&sort=votes&site=stackoverflow&filter=!9Z(-wzfpy`)
        const json = await response.json()

        dispatch({type: GET_ANSWERS, payload: json})
        dispatch({type: IS_LOADING, payload: false})
    }
}

export function getTitleAnswers(id:any) {
    return async (dispatch:any) =>  {
        const response = await fetch(`${url}questions/${id}?order=desc&sort=activity&site=stackoverflow&filter=withbody`)
        const json = await response.json()

        dispatch({type: TITLE_ANSWERS, payload: json})
    }
}
export function getNameSort(name:String) {
    return (dispatch:any) =>  {
        dispatch({type: SORT_TYPE, payload: name})
        dispatch(fetchData())
    }
}

export function getOrderType(name:String) {
    return (dispatch:any) =>  {
        dispatch({type: ORDER_TYPE, payload: name})
        dispatch(fetchData())
    }
}

export function getSearchData(search:any) {
    return (dispatch:any) =>  {
        dispatch({type: SEARCH_DATA, payload: search})
        dispatch(fetchData())
    }
}
