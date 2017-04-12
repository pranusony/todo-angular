import {HttpClient} from "../../src/client/core/HttpClient";
import {Http, Response, RequestOptions, ResponseOptions} from "@angular/http";

import Jasmine = jasmine.Jasmine;
import Spy = jasmine.Spy;
import {Observable} from "rxjs";

describe("HttpClient Spec", () => {
    let httpClient:HttpClient;
    let http:Http;

    beforeEach(() => {
        // not the Angular way to mock, but easier
        http = new Http(null, null);

        httpClient = new HttpClient(http);

        window.location.hash = "abc";
    });

    it("should get successfully", () => {
        spyOn(http, "request").and.returnValue(getSuccessResponse());

        httpClient.get("/comms").subscribe((resp:Response) => {
            console.log("resp", resp);
        });

        expect(http.request).toHaveBeenCalledWith("http://localhost:9876/api/v1/comms", jasmine.any(Object));
    });

    it("should handle errors on get", () => {
        spyOn(http, "request").and.returnValue(getErrorResponse());

        let erred;

        try {
            httpClient.get("/comms").subscribe((resp: Response) => {
            });
        } catch (e) {
            erred = true;
        }

        expect(http.request).toHaveBeenCalledWith("http://localhost:9876/api/v1/comms", jasmine.any(Object));
        expect(erred).toBeTruthy();
    });

    it("should post successfully", () => {
        spyOn(http, "request").and.returnValue(getSuccessResponse());

        httpClient.post("/comms", new RequestOptions()).subscribe((resp:Response) => {
        });

        // TODO - verify that the method was POST
        expect(http.request).toHaveBeenCalledWith("http://localhost:9876/api/v1/comms", jasmine.any(Object));
    });

    function getSuccessResponse() {
        let options = new ResponseOptions({body: {}});
        let resp:Response = new Response(options);
        resp.status = 200;
        resp.ok = true;
        return Observable.of(resp);
    }

    function getErrorResponse() {
        let options = new ResponseOptions({body: {}});
        let resp:Response = new Response(options);
        resp.status = 500;
        resp.ok = false;
        return Observable.of(resp);
    }
});