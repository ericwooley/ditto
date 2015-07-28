/// <reference path="../../typings/tsd.d.ts"/>
import React = require('react');
export class ReactClassProps {
  public test : string
}
export class ReactClass extends React.Component<ReactClassProps, any> {
  constructor() {
    super();
    console.log('works');
  }
}
