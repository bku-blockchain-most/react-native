/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View} from 'react-native';
import {VictoryChart, VictoryBar} from 'victory-native';
import {dataNTC} from '../create';

const data = dataNTC();
const values = data.map((values, index) => {
  return {x: index + 1, y: Math.round((values.TT / values.TD) * 1000) / 10};
});
const label = data.map(item => item.name);

export default class OrganiserDistribution extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <VictoryChart domain={{x: [0, 5], y: [0, 100]}}>
          <VictoryBar data={values} categories={{x: label}} labels={d => d.y} style={{labels: {fill: 'green'}}} />
        </VictoryChart>
      </View>
    );
  }
}
