import { FETCH_DATA, GET_ANSWERS, TITLE_ANSWERS } from "./types";

const url = 'https://api.stackexchange.com/2.2/'

export function fetchData(currentPage: number, pageSize: number) {
    return async (dispatch:any) =>  {
        const response = await fetch(`${url}questions?page=${currentPage}&pageSize=${pageSize}&order=desc&sort=activity&filter=!nKzQUR693x&site=stackoverflow&key=HvkZRI2Sh7NzURDMbtNXhQ((`)
        const json = await response.json()
        //console.log(currentPage, pageSize)
        dispatch({type: FETCH_DATA, payload: json})
    }
}

export function getAnswers(id:Number) {
    return async (dispatch:any) =>  {
        const response = await fetch(`${url}questions/${id}/answers?order=desc&sort=votes&site=stackoverflow&filter=!9Z(-wzfpy`)
        const json = await response.json()
        //console.log(json)
        dispatch({type: GET_ANSWERS, payload: json})
    }
}

export function titleAnswers(title:String) {
    return async (dispatch:any) =>  {
        const response = await fetch(`${url}questions/${title}?order=desc&sort=activity&site=stackoverflow&filter=withbody`)
        const json = await response.json()
        
        dispatch({type: TITLE_ANSWERS, payload: json})
    }
}
