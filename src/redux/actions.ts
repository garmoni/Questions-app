import { FETCH_DATA, GET_ANSWERS, TITLE_ANSWERS, IS_LOADING } from "./types";

const url = 'https://api.stackexchange.com/2.2/'
//https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=activity&answers=1&title=jquery&site=stackoverflow

export function fetchData(currentPage: number, pageSize: number) {
    return async (dispatch:any) =>  {
        dispatch({type: IS_LOADING, payload: true})
        const response = await fetch(`${url}questions?page=${currentPage}&pageSize=${pageSize}&order=desc&sort=activity&filter=!nKzQUR693x&site=stackoverflow&key=HvkZRI2Sh7NzURDMbtNXhQ((`)
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

export function getTitleAnswers(title:String) {
    return async (dispatch:any) =>  {
        const response = await fetch(`${url}questions/${title}?order=desc&sort=activity&site=stackoverflow&filter=withbody`)
        const json = await response.json()
        
        dispatch({type: TITLE_ANSWERS, payload: json})
    }
}
