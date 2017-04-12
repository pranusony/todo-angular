import {RestClient} from "../../src/client/core/RestClient";
import {HttpClient} from "../../src/client/core/HttpClient";
import {Http, Response, RequestOptions, ResponseOptions} from "@angular/http";

import Jasmine = jasmine.Jasmine;
import Spy = jasmine.Spy;
import {Observable} from "rxjs";

describe("RestClient Spec", () => {
    let restClient:RestClient;
    let httpClient:HttpClient;

    beforeEach(() => {
        httpClient = new HttpClient(null);

        restClient = new RestClient(httpClient);
    });

    it("should get successfully", () => {
        spyOn(httpClient, "get").and.returnValue(getSuccessResponse());

        restClient.get("acme.com").subscribe((resp:Response) => {
        });

        expect(httpClient.get).toHaveBeenCalledWith("acme.com");
    });

    it("should handle errors on get", () => {
        spyOn(httpClient, "get").and.callFake(() => {
            throw new Error("mock error");
        });

        let erred;
        try {
            restClient.get("acme.com").subscribe((resp: Response) => {
            });
        } catch (e) {
            erred = true;
        }

        expect(httpClient.get).toHaveBeenCalledWith("acme.com");
        expect(erred).toBeTruthy();
    });

    it("should post successfully", () => {
        spyOn(httpClient, "post").and.returnValue(getSuccessResponse());

        restClient.post("acme.com", new RequestOptions()).subscribe((resp:Response) => {
        });

        expect(httpClient.post).toHaveBeenCalledWith("acme.com", jasmine.any(Object));
    });

    function getSuccessResponse() {
        let body = {
            name: "test"
        };

        let options = new ResponseOptions({body: body});
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