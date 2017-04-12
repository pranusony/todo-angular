import {browser, by, element} from "protractor";

describe("App", () => {

  beforeEach(() => {
    browser.get("/");
  });

  it("should have a title", () => {
    let promise = browser.getTitle();

    promise.then((val) => {
       expect(val).toEqual("localhost");
     });
  });
});
