import React,{Component} from 'react';
import {View,processColor} from 'react-native';
import HBarChart from '../common/HBarChart';
import database from '../database.json';

import _ from 'lodash';


export default class PresenterChart extends Component{
    constructor(props){
        super(props);
    this.dt = {
        legend: {
          enabled: true,
          textSize: 14,
          form: 'SQUARE',
          formSize: 14,
          xEntrySpace: 10,
          yEntrySpace: 5,
          formToTextSpace: 5,
          wordWrapEnabled: true,
          maxSizePercent: 0.5,
        },
        data: {
          dataSets: [{
            values: [ 5,5],
            label: 'Bar dataSet',
            config: {
              color: [processColor("red")],
              barShadowColor: processColor('lightgrey'),
              highlightAlpha: 90,
              highlightColor: processColor('red'),
            }
          }],
        },
        xAxis: {
          valueFormatter: ['1 *', '2 *', '3 *', '4 *', '5 *'],
          position: 'BOTTOM',
          granularityEnabled: true,
          granularity: 1,
          labelCount: 10,
        },
        yAxis: {left:{axisMinimum: 0}}
      };
  
    }
    render(){
        const color=["#ed7615", "#edb015", "#edde15", "#35d127", "#107007"];
        const dt = _.valuesIn(database.boothInfo.find(x => x.boothId == this.props.boothId).statics.feedback);
        const newdata=_.cloneDeep(this.dt);
        newdata.data.dataSets[0].values=dt;
        newdata.data.dataSets[0].config.color=color.map(item=>processColor(item));
        return(
            <View style={{flex:1}}>
            <HBarChart data={newdata}/>
            </View>
        );
    }
}