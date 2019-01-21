/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View} from 'react-native';
import NewPie from '../common/NewPie';
import database from '../database.json';

export default class PresenterChart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const dt = database.boothInfo.find(x => x.boothId === this.props.boothId).statics.thanhPhan;
    const dtCreate = () => {
      return database.roleName.map((item, index) => {
        return {
          label: item,
          value: dt[index],
        };
      });
    };
    const data = dtCreate();
    return (
      <View style={{flex: 1}}>
        <NewPie data={data} />
      </View>
    );
  }
}
