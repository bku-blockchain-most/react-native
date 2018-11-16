import React, { Component } from 'react';
import List from './ListComponent';

export default class Report extends Component{
    render(){
      const {navigate} = this.props.navigation;
        return <List nav={navigate}/>;
    }
}
