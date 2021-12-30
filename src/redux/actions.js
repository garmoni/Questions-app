import { FETCH_DATA } from "./types";

export function fetchData() {
    //https://api.stackexchange.com/2.2/questions/70533376/related?&order=desc&sort=activity&site=stackoverflow&filter=!)EhwLl5mQ7U05E2REsN)vnfFYU(LzU*OhEX2x5POOu3IS89Si&key=X*Dl33mPzca8jXX)58SHiQ((
    //https://api.stackexchange.com/2.2/questions/72/answers?order=desc&sort=votes&site=stackoverflow&filter=!9Z(-wzfpy
    const url = 'https://api.stackexchange.com/2.3/questions?page=1&pagesize=100&order=desc&sort=activity&site=stackoverflow&filter=withbody&key=X*Dl33mPzca8jXX)58SHiQ(('
    return async dispatch =>  {
        const response = await fetch(url)
        const json = await response.json()
        console.log(json)
        dispatch({type: FETCH_DATA, payload: json})
    }
}
