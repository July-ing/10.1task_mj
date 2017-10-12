import 'whatwg-fetch';

export function post(url, paramsObj){
    var result = fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(paramsObj)
    });
    return result;
}