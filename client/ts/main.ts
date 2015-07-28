/// <reference path="./react-test.ts"/>
import {ReactClass, ReactClassProps} from './react-test';
function greeter(person : string) {
    return "Hello, " + person;
}

var user = "Jane User";

console.log(greeter(user));

console.log(ReactClass)
var rtest = new ReactClass();
// Doesn't work
/*var rtest = new ReactTest()*/

// Doesn't work
/*var rtest = ReactClass.ReactTest();*/
