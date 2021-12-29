import { FETCH_DATA } from "./types";

export function fetchData() {
    const url = 'https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow&filter=withbody'
    return async dispatch =>  {
        const response = await fetch(url)
        const json = await response.json()
        console.log(json)
        dispatch({type: FETCH_DATA, payload: json})
        return json
    }
}
