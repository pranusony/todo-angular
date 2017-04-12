
import any = jasmine.any;
import Spy = jasmine.Spy;
import {Errors} from "../../../src/client/app/comm_system/constants";
import {EventDispatcher} from "../../../src/client/app/comm_system/EventDispatcher";

describe('EventDispatcher', function() {
    
    var eventDispatcher:any = new EventDispatcher();
    var throws;

    beforeEach(function (done) {
        throws = null;
        done();
    });

    describe("subscribe",()=>{

        it('should throw an error when subscribing with event not of type string', function(done) {
            throws = function() {
                eventDispatcher.addEventListener({});
            };
            expect(throws).toThrowError(Errors.ERROR_SUBSCRIBING_EVENT_NAME_NOT_TYPE_STRING);

            throws = function() {
                eventDispatcher.addEventListener();
            };
            expect(throws).toThrowError(Errors.ERROR_SUBSCRIBING_EVENT_NAME_NOT_TYPE_STRING);

            throws = function() {
                eventDispatcher.addEventListener(null);
            };
            expect(throws).toThrowError(Errors.ERROR_SUBSCRIBING_EVENT_NAME_NOT_TYPE_STRING);

            done();
        });

        it('should throw an error when no handler is passed while subscribing to an event', function(done) {

            throws = function() {
                eventDispatcher.addEventListener("event");
            };

            expect(throws).toThrowError(Errors.ERROR_NO_HANDLER_WHILE_SUBSCRIBING);

            throws = function() {
                eventDispatcher.addEventListener("event",null);
            };

            expect(throws).toThrowError(Errors.ERROR_NO_HANDLER_WHILE_SUBSCRIBING);

            done();
        });

        it('should throw an error when handler is not of type function', function(done) {

            throws = function() {
                eventDispatcher.addEventListener("event",{});
            };

            expect(throws).toThrowError(Errors.ERROR_SUBSCRIBING_HANDLER_NOT_TYPE_FUNCTION);
            done();
        });

        it('should allow to subscribe to event of type string', function(done) {

            eventDispatcher.addEventListener("event", function(data){});
            expect(eventDispatcher.hasListeners("event")).toBe(true);
            done();
        });
    });

    describe("publish",()=>{


        it('should throw an error when trying to publish event not of type string', function(done) {

            throws = function() {
                eventDispatcher.dispatchEvent({});
            };
            expect(throws).toThrowError(Errors.ERROR_PUBLISHING_EVENT_NAME_NOT_TYPE_STRING);

            throws = function() {
                eventDispatcher.dispatchEvent();
            };
            expect(throws).toThrowError(Errors.ERROR_PUBLISHING_EVENT_NAME_NOT_TYPE_STRING);

            throws = function() {
                eventDispatcher.dispatchEvent(null);
            };
            expect(throws).toThrowError(Errors.ERROR_PUBLISHING_EVENT_NAME_NOT_TYPE_STRING);

            done();
        });

        it('should successfully publish event of type string to all the handlers', function(done) {

           var eventData:any = {};
           var spy1:Spy = jasmine.createSpy("spy1");
           var spy2:Spy = jasmine.createSpy("spy2");

            eventDispatcher.addEventListener("event", spy1);
            eventDispatcher.addEventListener("event", spy2);

            eventDispatcher.dispatchEvent("event",eventData);

            expect(spy1).toHaveBeenCalledWith(eventData);
            expect(spy1).toHaveBeenCalledTimes(1);
            expect(spy2).toHaveBeenCalledWith(eventData);
            expect(spy2).toHaveBeenCalledTimes(1);
            done();

        });


        it('should call the handler with right context if the context is passed while subscribing', function(done) {

            var handlerContext ={};
            var handler = function(){

                expect(this).toEqual(handlerContext);
                done();
            };

            eventDispatcher.addEventListener("action123123",handler,handlerContext);
            eventDispatcher.dispatchEvent("action123123");

        });

        it('should call the handler with undefined context if no context is passed while subscribing', function(done) {


            var handler = function(){

                expect(this).toEqual(undefined);
                done();
            };

            eventDispatcher.addEventListener("action",handler);
            eventDispatcher.dispatchEvent("action");

        });
    });

    describe("unSubscribe",()=>{
        it('should throw an error when trying to unsubscribe from an event not of type string', function(done) {
            throws = function() {
                eventDispatcher.removeEventListener({});
            };
            expect(throws).toThrowError(Errors.ERROR_UNSUBSCRIBING_EVENT_NAME_NOT_TYPE_STRING);

            throws = function() {
                eventDispatcher.removeEventListener();
            };
            expect(throws).toThrowError(Errors.ERROR_UNSUBSCRIBING_EVENT_NAME_NOT_TYPE_STRING);

            throws = function() {
                eventDispatcher.removeEventListener(null);
            };
            expect(throws).toThrowError(Errors.ERROR_UNSUBSCRIBING_EVENT_NAME_NOT_TYPE_STRING);

            done();
        });

        it('should throw an error when no handler is passed while unsubscribing to an event', function(done) {

            throws = function() {
                eventDispatcher.removeEventListener("event");
            };

            expect(throws).toThrowError(Errors.ERROR_NO_HANDLER_WHILE_UNSUBSCRIBING);

            throws = function() {
                eventDispatcher.removeEventListener("event",null);
            };

            expect(throws).toThrowError(Errors.ERROR_NO_HANDLER_WHILE_UNSUBSCRIBING);

            done();
        });

        it('should throw an error when trying to unsubscribe with handler not of type function', function(done) {

            throws = function() {
                eventDispatcher.removeEventListener("event",{});
            };
            expect(throws).toThrowError(Errors.ERROR_UNSUBSCRIBING_HANDLER_NOT_TYPE_FUNCTION);
            done();
        });

        it('should allow to unsubscribe an handler for an event if it is registered', function(done) {

            var handler1 = function(data){};

            var handler2 = function(data){};

            eventDispatcher.addEventListener("event", handler1);
            eventDispatcher.addEventListener("event", handler2);

            expect(eventDispatcher.hasListeners("event")).toBe(true);

            eventDispatcher.removeEventListener("event",handler1);
            expect(eventDispatcher.hasListeners("event")).toEqual(true);

            done();
        });
    });

});
