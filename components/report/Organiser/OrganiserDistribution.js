import React, { Component } from 'react';
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
import {
    dataNTC,
    countTicket
} from '../create';
import _ from 'lodash';
import victoryLabel from 'victory-native/lib/components/victory-label';
import victoryAxis from 'victory-native/lib/components/victory-axis';

const data = dataNTC();
const values = data.map((values, index)=>{
    return {x:index + 1,y:Math.round(values.TT / values.TD * 1000) / 10};
});
const label = data.map(item=>item.name);
const dataSets = [{
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
            <View style={{flex:1}}>
                <VictoryChart domain={{ x: [0, 5], y:[0,100] }}>

                        <VictoryBar
                            data={values}
                            categories={{ x: label }}
                            labels={(d)=>d.y}
                            style={{labels: {fill :'green'}}}
                        />

                </VictoryChart>
            </View>
        );
    }
}
