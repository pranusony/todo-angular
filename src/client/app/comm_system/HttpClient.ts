

var whatwgFetch = require("whatwg-fetch");

declare var fetch:any;


export class HttpClient implements IHttpClient {


    get(url:string):Promise<any> {
        var init:RequestInit = {};
        init.credentials = "same-origin";
        return  this.fetchData(url,init);
    }

    fetchData(input:string, init?:RequestInit):Promise<any> {
        
        if(!init)
        {
            init = {};
        }

        init.credentials = "same-origin";
        return fetch(input, init).then(checkStatus).then(parseJSON);
    }
}

function checkStatus(response:Response) {
    if (response.status >= 200 && response.status < 300) {

        return response
    } else {
        var error:any = new Error(response.statusText);
        error.response = response;
        throw error
    }
}
function  parseJSON(response:Response) {
    return response.json().then((result:any)=>{
        return result.result;
    })
}



