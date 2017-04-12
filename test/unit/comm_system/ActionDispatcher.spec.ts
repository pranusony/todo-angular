
import any = jasmine.any;
import Spy = jasmine.Spy;

import {Errors} from "../../../src/client/app/comm_system/constants";
import {ActionDispatcher} from "../../../src/client/app/comm_system/ActionDispatcher";

describe('ActionDispatcher', function() {

    var actionDispatcher:any = new ActionDispatcher();
    var throws;

    beforeEach(function (done) {
        throws = null;
        done();
    });

    var actionNumber:number = 0;
    function registerAction(handler,handlerContext?):string
    {
        var action:string = "action"+actionNumber;
        actionDispatcher.registerAction("action"+actionNumber,handler,handlerContext);
        actionNumber++;
        return action;
    }

    describe("registerAction",()=>{
        it('should throw an error when registering action with actionName not of type string', function(done) {
            throws = function() {
                actionDispatcher.registerAction({});
            };
            expect(throws).toThrowError(Errors.ERROR_REGISTERING_ACTION_NAME_NOT_TYPE_STRING);

            throws = function() {
                actionDispatcher.registerAction();
            };
            expect(throws).toThrowError(Errors.ERROR_REGISTERING_ACTION_NAME_NOT_TYPE_STRING);

            throws = function() {
                actionDispatcher.registerAction(null);
            };
            expect(throws).toThrowError(Errors.ERROR_REGISTERING_ACTION_NAME_NOT_TYPE_STRING);

            done();
        });

        it('should throw an error when no handler is passed, while registering an action', function(done) {

            throws = function() {
                actionDispatcher.registerAction("action");
            };

            expect(throws).toThrowError(Errors.ERROR_REGISTERING_ACTION_NO_HANDLER_GIVEN);

            throws = function() {
                actionDispatcher.registerAction("event",null);
            };

            expect(throws).toThrowError(Errors.ERROR_REGISTERING_ACTION_NO_HANDLER_GIVEN);

            done();
        });

        it('should throw an error when handler is not of type function, while registering an action', function(done) {

            throws = function() {
                actionDispatcher.registerAction("event",{});
            };

            expect(throws).toThrowError(Errors.ERROR_REGISTERING_ACTION_HANDLER_NOT_TYPE_FUNCTION);
            done();
        });

        it('should throw an error when handler is already set for the action', function(done) {

            actionDispatcher.registerAction("event",function(){});
            throws = function() {
                actionDispatcher.registerAction("event",function(){});
            };

            expect(throws).toThrowError(Errors.ERROR_REGISTERING_ACTION_ONLY_ONE_HANDLER_ALLOWED);
            done();
        });
    });

    describe("unregisterAction",()=>{
        it('should throw an error when trying to un-register from an action not of type string', function(done) {
            throws = function() {
                actionDispatcher.unregisterAction({});
            };
            expect(throws).toThrowError(Errors.ERROR_UNREGISTERING_ACTION_NAME_NOT_TYPE_STRING);

            throws = function() {
                actionDispatcher.unregisterAction();
            };
            expect(throws).toThrowError(Errors.ERROR_UNREGISTERING_ACTION_NAME_NOT_TYPE_STRING);

            throws = function() {
                actionDispatcher.unregisterAction(null);
            };
            expect(throws).toThrowError(Errors.ERROR_UNREGISTERING_ACTION_NAME_NOT_TYPE_STRING);

            done();
        });

        it('should throw an error when no handler is passed while un-registering to an anction', function(done) {

            throws = function() {
                actionDispatcher.unregisterAction("event");
            };

            expect(throws).toThrowError(Errors.ERROR_UNREGISTERING_ACTION_NO_HANDLER_GIVEN);

            throws = function() {
                actionDispatcher.unregisterAction("event",null);
            };

            expect(throws).toThrowError(Errors.ERROR_UNREGISTERING_ACTION_NO_HANDLER_GIVEN);

            done();
        });

        it('should throw an error when trying to un-register with handler not of type function', function(done) {

            throws = function() {
                actionDispatcher.unregisterAction("event",{});
            };
            expect(throws).toThrowError(Errors.ERROR_UNREGISTERING_ACTION_HANDLER_NOT_TYPE_FUNCTION);
            done();
        });

        it('should successfully unregister action', function(done) {

            function handler():void
            {

            }
            actionDispatcher.registerAction("action",handler);
            actionDispatcher.unregisterAction("action",handler);
            expect(actionDispatcher.hasAction("action")).toBe(false);
            done();
        });
    });

    describe("perform",()=>{
        it('should throw an error when taking action name not of type string', function(done) {

            throws = function() {
                actionDispatcher.perform({});
            };
            expect(throws).toThrowError(Errors.ERROR_TAKING_ACTION_ACTION_NAME_NOT_TYPE_STRING);
            done();
        });

        it('should successfully call any handler associated with the action', function(done) {

            var handler = function(data){
                done();
            };

            var action = registerAction(handler);

            actionDispatcher.perform(action);
        });

        it('should successfully call handler associated with the action, with appropriate parameters', function(done) {

            var paramA = "A";
            var paramB = {};
            var handler = function(param1,param2){

                expect(arguments.length).toEqual(2);
                expect(param1).toEqual(paramA);
                expect(param2).toEqual(paramB);
                done();
            };

            var action = registerAction(handler);

            actionDispatcher.perform(action,paramA,paramB);

        });

        it('should call the handler with right context if the context is passed while registering', function(done) {

            var handlerContext ={};
            var paramA = "A";
            var paramB = {};
            var handler = function(param1,param2){

                expect(this).toEqual(handlerContext);
                done();
            };

            var action = registerAction(handler,handlerContext);

            actionDispatcher.perform(action,paramA,paramB);

        });

        it('should call the handler with undefined context if no context is passed while registering', function(done) {

            var handler = function(){

                expect(this).toEqual(undefined);
                done();
            };

            var action = registerAction(handler);
            actionDispatcher.perform(action);

        });

        it('should return a promise, when handler returns a promise', function(done) {

            var handler = function(data){
                return new Promise(function(){});
            };
            var action = registerAction(handler);

            var result = actionDispatcher.perform(action, "humm");

            expect(result instanceof Promise).toEqual(true);
            done();
        });

        it('should return a promise, when handler returns a value', function(done) {

            var handler = function(data){
                return true;
            };
            var action = registerAction(handler);

            var result = actionDispatcher.perform(action, "humm");

            expect(result instanceof Promise).toEqual(true);
            done();
        });

        it('should reject with error if handler throws error', function(done) {

            var handler = function(data){
                throw new Error("yay");
            };
            var action = registerAction(handler);

            var result = actionDispatcher.perform(action, "humm");

            expect(result instanceof Promise).toEqual(true);

            result.then(null,(error)=>{
                expect(error).toEqual(jasmine.any(Error));
                expect(error.message).toEqual("yay");
                done();
            })

        });
    });


    describe("hasAction",()=>{
        it('should return true if action registered', function(done) {
            var action = registerAction(function(){});

            expect(actionDispatcher.hasAction(action)).toBe(true);
            done();
        });

        it('should return false if no action registered', function(done) {
            expect(actionDispatcher.hasAction("ewrwer")).toBe(false);
            done();
        });
    });

});
