import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Table from '../common/TableData';
import {
  dataNTC,
  countTicket
} from '../create';
import _ from 'lodash';

export default class OrganiserStatistics extends Component {
  constructor(props) {
    super(props);
    /*this.data = {
      tableHead: ['Linh vuc', 'So luong\n quan tam', 'So luong\ntuong tac'],
      tableData: [
        ['Blockchain','400', '250'],
        ['IoT','800', '3000'],
        ['XXX','400', '270'],
      ]
    }*/
  }
  render() {
    const Head = ['Lĩnh vực','Quan Tâm','Tham Dự','Tương Tác'];
    const Data = dataNTC().map(item=>_.valuesIn(item));
    return (
      <View style={styles.container}>
        <Table Head={Head} Data={Data} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff'
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff'
  },
  text: {
    margin: 6,
    textAlign:'center'
  }
});
