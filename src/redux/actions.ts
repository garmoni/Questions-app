import { FETCH_DATA, GET_ANSWERS, TITLE_ANSWERS } from "./types";

const url = 'https://api.stackexchange.com/2.2/'

export function fetchData() {
    return async (dispatch:any) =>  {
        const response = await fetch(`${url}questions?page=1&pagesize=100&order=desc&sort=activity&site=stackoverflow&filter=withbody&key=X*Dl33mPzca8jXX)58SHiQ((`)
        const json = await response.json()

        dispatch({type: FETCH_DATA, payload: json})
    }
}

export function getAnswers(id:Number) {
    return async (dispatch:any) =>  {
        const response = await fetch(`${url}questions/${id}/answers?order=desc&sort=votes&site=stackoverflow&filter=!9Z(-wzfpy`)
        const json = await response.json()

        dispatch({type: GET_ANSWERS, payload: json})
    }
}

export function titleAnswers(title:String) {
    console.log(title)
    return async (dispatch:any) =>  {
        const response = await fetch(`${url}questions/${title}?order=desc&sort=activity&site=stackoverflow`)
        const json = await response.json()

        dispatch({type: TITLE_ANSWERS, payload: json})
    }
}
