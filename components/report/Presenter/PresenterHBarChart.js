import React,{Component} from 'react';
import database from '../database.json';
import {View,processColor} from 'react-native';
import {
    VictoryChart,
    VictoryBar,
    VictoryLabel,
    VictoryAxis,
    VictoryGroup,
    VictoryCandlestick,
    VictoryLine,
    VictoryScatter,
    VictoryArea,
    VictoryStack,
    VictoryTooltip
  } from 'victory-native';
import _ from 'lodash';


export default class PresenterChart extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const color = ['#ed7615', '#edb015', '#edde15', '#35d127', '#107007'];
        const dt = _.valuesIn(database.boothInfo.find(x => x.boothId == this.props.boothId).statics.feedback);
        return (
          <View style={{flex:1}}>
          <VictoryChart domain={{ x: [0, 200], y:[0,6] }  }>

                  <VictoryBar
                      data={dt.map((value,index)=>({x:index + 1,y:value}))}
                      categories={{ x: ['1 *', '2 *', '3 *', '4 *', '5 *'] }}
                      labels={(d)=>d.y}
                      horizontal={true}
                      style={{labels: {fill :'green'}}}
                  />

          </VictoryChart>
      </View>
        );
    }
}
