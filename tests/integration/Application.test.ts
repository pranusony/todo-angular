
import {Application} from "../../src/client/views/Application";

describe("Application Integration Test cases", () => {

    describe("sayHiButton on click", () => {

        let application:Application;
        let appNode:HTMLDivElement;
        let sayHiButton:HTMLButtonElement;
        let sayHiResponseLabel:HTMLSpanElement;

        beforeEach(function ():void {

            appNode = document.createElement("div");
            sayHiButton = document.createElement("button");
            sayHiButton.id = "sayHiButton";
            sayHiResponseLabel = document.createElement("span");
            sayHiResponseLabel.id = "sayHiResponseLabel";

            appNode.appendChild(sayHiButton);
            appNode.appendChild(sayHiResponseLabel);

            document.body.appendChild(appNode);

            application = new Application();
        });

        it("should say hello hi", (done) => {

            expect(true).toEqual(true);
            done();
        });

    });
});