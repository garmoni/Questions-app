import { FETCH_DATA } from "./types";

export function fetchData(input, select) {
    return async dispatch =>  {
        const response = await fetch(`https://api.stackexchange.com/2.3/users?fromdate=1298764800&todate=1298851200&order=desc&sort=reputation&site=stackoverflow`)
        const json = await response.json()
        dispatch({type: FETCH_DATA, payload: json})
        return json
    }
}
