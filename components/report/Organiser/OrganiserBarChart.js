/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View} from 'react-native';
import {VictoryChart, VictoryBar, VictoryGroup, VictoryLegend} from 'victory-native';
import _ from 'lodash';

import {dataNTC} from '../create';

const data = dataNTC();

const dt = {
  'Quan tam': data.map(item => item.QT),
  'Tham Du': data.map(item => item.TD),
  'Tuong tac': data.map(item => item.TT),
};

const label = data.map(item => item.name);

//[{values=[1,2,3],label=tuongtac},{value,key}]
export default class Organiser extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <VictoryChart style={{flex: 1}} domain={{x: [0, 5]}}>
          <VictoryLegend
            x={115}
            y={20}
            orientation="horizontal"
            gutter={20}
            style={{border: {stroke: 'black'}, title: {fontSize: 20}}}
            data={[{name: 'Quan tâm', symbol: {fill: '#003333'}}, {name: 'Tham dự', symbol: {fill: '#009999'}}, {name: 'Tương tác', symbol: {fill: '#FFCC33'}}]}
          />
          <VictoryGroup categories={{x: label}} offset={10} colorScale={'qualitative'}>
            <VictoryBar data={dt['Quan tam'].map((value, index) => ({x: index + 1, y: value}))} />
            <VictoryBar data={dt['Tham Du'].map((value, index) => ({x: index + 1, y: value}))} />
            <VictoryBar data={dt['Tuong tac'].map((value, index) => ({x: index + 1, y: value}))} />
          </VictoryGroup>
        </VictoryChart>
      </View>
    );
  }
}
