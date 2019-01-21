/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, ViewPagerAndroid} from 'react-native';
import {ButtonGroup, Header} from 'react-native-elements';
import OrganiserStatistics from './OrganiserStatistics';
import OrganiserBarChart from './OrganiserBarChart';
import OrganiserDistribution from './OrganiserDistribution';
export default class Organiser extends Component {
  static navigationOptions = {
    title: 'Nhà tổ chức',
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({selectedIndex});
  }

  render() {
    const buttons = ['Số liệu', 'Biểu đồ'];
    const {selectedIndex} = this.state;
    if (selectedIndex == 0) {
      return (
        <View style={{flex: 1}}>
          {/* <Header
                        placement="left"
                        centerComponent={<Text style={{fontSize:30,color:'white' }} >{Organiser.navigationOptions.title.toLocaleUpperCase()}</Text>}
                        backgroundColor="#ff0000"
                    /> */}
          <ButtonGroup onPress={this.updateIndex} selectedIndex={selectedIndex} buttons={buttons} containerStyle={{height: 30}} selectedButtonStyle={{backgroundColor: 'cyan'}} />
          <OrganiserStatistics />
        </View>
      );
    }
    return (
      <View style={{flex: 1}}>
        <Header
          placement="left"
          centerComponent={<Text style={{fontSize: 30, color: 'white'}}>{Organiser.navigationOptions.title.toLocaleUpperCase()}</Text>}
          backgroundColor="#ff0000"
        />
        <ButtonGroup onPress={this.updateIndex} selectedIndex={selectedIndex} buttons={buttons} containerStyle={{height: 30}} selectedButtonStyle={{backgroundColor: 'cyan'}} />
        <View style={{flex: 1}}>
          <ViewPagerAndroid style={styles.viewPager} initialPage={0}>
            {
              <View style={styles.pageStyle} key="1">
                <OrganiserBarChart />
              </View>
            }
            <View style={styles.pageStyle} key="2">
              <OrganiserDistribution />
            </View>
          </ViewPagerAndroid>
        </View>
      </View>
    );
  }
}

var styles = {
  viewPager: {
    flex: 1,
  },
  pageStyle: {
    flex: 1,
  },
};
