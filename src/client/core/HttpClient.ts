import {Resources} from "../constants/resource-constants";
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class HttpClient {

    protected http:Http;
    private authToken:string;

    constructor(http:Http) {

        this.http = http;
        this.authToken = "Bearer " + getHashStringValue("token");
    }

    get(endpoint:string):Observable<Response> {

        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.set(Resources.REQUEST.headers.ACCEPT, Resources.REQUEST.contentTypeJSON);
        options.method = "GET";

        return this.request(Resources.URL.apiBase + endpoint, options);
    }

    post(endpoint: string, requestOptions: RequestOptions):Observable<Response> {

        requestOptions.method = Resources.REQUEST.methods.POST;
        return this.request(Resources.URL.apiBase + endpoint, requestOptions);
    }

    private request(url: string, options: RequestOptions):Observable<Response> {

        if (!options.headers) {
            options.headers = new Headers();
        }

        this.appendAuthorizationHeader(options.headers);
        return this.http.request(url, options).map(this.checkStatus);
    }

    private appendAuthorizationHeader(headers:Headers):void {
        headers.set(Resources.REQUEST.headers.AUTHORIZATION, this.authToken);
    }

    private checkStatus(response: Response) {
        if (response.ok) {
            return response;
        } else {
            let error: any = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }

}

function getHashStringValue (key):string {
    return getSearchStringValue(window.location.hash.replace("#", "?"), key);
}

function getSearchStringValue(searchString:string, key):string {
    return decodeURIComponent(searchString.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}
