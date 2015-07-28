/// <reference path="../../../typings/tsd.d.ts"/>
import {ReactClass, ReactClassProps} from '../react-test';
describe('test', () => {
  it('should test', () => {
    expect(true).toBe(true);
    expect(ReactClass).toBeDefined
    expect(ReactClassProps).not.toBeDefined
    expect(new ReactClassProps()).toBeDefined
    /*expect(new ReactClassProps()).toBeDefined*/
  })
})
