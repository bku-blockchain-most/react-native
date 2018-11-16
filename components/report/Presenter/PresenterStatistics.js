import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Table from '../common/TableData';
import database from '../database.json';
import _ from 'lodash';

export default class PresenterStatistics extends Component {
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
      const Head = ['Thành phần', 'Số lượng'];
      const dt = database.boothInfo.find(x => x.boothId == this.props.boothId).statics.thanhPhan;
      const dtCreate = () => {
      return database.roleName.map((item,index)=>{
          return {
              loai : item,
              sl : dt[index]
          };
      });
    };
    const Data = dtCreate().map(item=>_.valuesIn(item));
                  //Data=[[database.boothInfo.find(x=>x.boothId == 2).statics.thanhPhan[1],1]]
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
