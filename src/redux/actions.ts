import { FETCH_DATA, GET_ANSWERS, TITLE_ANSWERS, PAGINATION_TYPE } from "./types";

const url = 'https://api.stackexchange.com/2.2/'

export function fetchData(currentPage: number, pageSize: number, totalSize: number) {
    return async (dispatch:any) =>  {
        const response = await fetch(`${url}questions?page=${currentPage}&total=${totalSize}&order=desc&sort=activity&site=stackoverflow&key=X*Dl33mPzca8jXX)58SHiQ((`)
        const json = await response.json()
        console.log(json)
        dispatch({type: FETCH_DATA, payload: json})
    }
}

export function getAnswers(id:Number) {
    return async (dispatch:any) =>  {
        const response = await fetch(`${url}questions/${id}/answers?order=desc&sort=votes&site=stackoverflow&filter=!9Z(-wzfpy`)
        const json = await response.json()
        console.log('id', id)
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

// export function paginationChange(pageNumber: number, pageSize: number) {
//     return (dispatch:any) => {
//         dispatch({type: PAGINATION_TYPE, pagination: {
//             pageCount: pageNumber,
//             rowCount: pageSize
//         }})
//     }
// }
