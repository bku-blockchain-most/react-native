import React, { Component } from 'react';
import {View,processColor} from 'react-native';
import BarChart from '../common/BarChart';
import {
    dataNTC,
    countTicket
} from '../create';
import _ from 'lodash';

import {Header} from 'react-native-elements';

const data=dataNTC();
const values=data.map(item=>{
    return Math.round(item.TT/item.TD*1000)/10;
});
const label=data.map(item=>item.name);
const dataSets= [{
    values: values,
    label: 'Tuong tac/tham du',
    config: {
      color: processColor('blue'),
      barShadowColor: processColor('blue'),
      highlightAlpha: 90,
      highlightColor: processColor('blue'),
    }
  }];
export default class OrganiserDistribution extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header 
                    centerComponent={{text:"BD",style:{fontSize:18,color:'red'}}}
                />
                <BarChart dataset = {dataSets} label={label} />
            </View>
        );
    }
}