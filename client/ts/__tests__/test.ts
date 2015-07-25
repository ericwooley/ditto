/// <reference path="../../../typings/tsd.d.ts"/>
import {Component} from 'react';
class Props {
  public test: string = 'test';
}
class ReactTest extends Component<Props, any> {
  constructor(props: Props) {
    super(props);
  }
}
describe('thing', () => {
  it('should creat a class', () => {
    /*expect(true).toEqual(false);*/
    expect(new ReactTest(new Props())).toBeTruthy();
  })
})
