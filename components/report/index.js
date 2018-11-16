import React, { Component } from 'react';
import List from './ListComponent';
import {Icon} from 'native-base';

export default class Report extends Component{
  // static navigationOptions = {
  //   title: 'Report',
  //   headerBackTitle: null,
  //   tabBarLabel: 'Report',

  //   tabBarIcon: ({tintColor}) => (
  //     <Icon
  //       name="file-report"
  //       type="MaterialCommunityIcons"
  //       style={{color: tintColor}}
  //     />
  //   ),
  // };
    render(){
      const {navigate}=this.props.navigation;
        return <List nav={navigate}/>;
    }
}
