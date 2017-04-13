
import {Resources} from "../constants/resource-constants";
import {HttpClient} from "./HttpClient";
import {Response, RequestOptions, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class RestClient {

    private httpClient:HttpClient;

    constructor(httpClient:HttpClient) {
        this.httpClient = httpClient;
    }

    /**
     * Get Method
     * @param endpoint
     * @returns {Observable<R>}
     */
    get(endpoint:string):Observable<any> {

        return this.httpClient.get(endpoint).map(this.parseJSON);
    }

    post(endpoint:string, body?:any, headers?:Headers):Observable<any> {
        let reqInit:RequestOptions = new RequestOptions();

        reqInit.headers = headers || new Headers();

        reqInit.headers.set(Resources.REQUEST.headers.CONTENT_TYPE, Resources.REQUEST.contentTypeJSON);

        if (body) {
            reqInit.body = JSON.stringify(body);
        }

        return this.httpClient.post(endpoint, reqInit).map(this.parseJSON);
    }

    private parseJSON(response: Response) {
        // TODO - has to be better way
        // response.json() throws exception for empty body
        if (response.text().length > 0) {
            return response.json();
        }
    }
}