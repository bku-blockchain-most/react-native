/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, ViewPagerAndroid} from 'react-native';
import {ButtonGroup} from 'react-native-elements';
import PresenterChart from './PresenterChart';
import PresenterHBarChart from './PresenterHBarChart';
import PresenterStatistics from './PresenterStatistics';

export default class GeneralPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      currentBooth: this.props.booth,
    };
    this.updateIndex = this.updateIndex.bind(this);
  }
  updateIndex(selectedIndex) {
    this.setState({...this.state, selectedIndex});
  }

  render() {
    if (this.state.currentBooth != this.props.booth) {
      this.setState({
        selectedIndex: 0,
        currentBooth: this.props.booth,
      });
    }
    const buttons = ['Số liệu', 'Biểu đồ'];
    const {selectedIndex} = this.state;
    if (selectedIndex == 0) {
      return (
        <View style={{flex: 1}}>
          <ButtonGroup onPress={this.updateIndex} selectedIndex={selectedIndex} buttons={buttons} containerStyle={{height: 30}} selectedButtonStyle={{backgroundColor: 'cyan'}} />

          <PresenterStatistics boothId={this.props.booth} />
        </View>
      );
    }
    return (
      <View style={{flex: 1}}>
        <ButtonGroup onPress={this.updateIndex} selectedIndex={selectedIndex} buttons={buttons} containerStyle={{height: 30}} selectedButtonStyle={{backgroundColor: 'cyan'}} />
        <View style={{flex: 1}}>
          <ViewPagerAndroid style={styles.viewPager} initialPage={0}>
            <View style={styles.pageStyle} key="1">
              <PresenterChart boothId={this.props.booth} />
            </View>
            <View style={styles.pageStyle} key="2">
              <PresenterHBarChart boothId={this.props.booth} />
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
// const buttons = ['Số liệu', 'Biểu đồ']
//         const { selectedIndex } = this.state
//         if(selectedIndex==0)
//         return (
//             <View style={{flex:1}}>
//             <ButtonGroup
//                 onPress={this.updateIndex}
//                 selectedIndex={selectedIndex}
//                 buttons={buttons}
//                 containerStyle={{ height: 30 }}
//                 selectedButtonStyle={{backgroundColor:'cyan'}}
//             />
//             <PresenterChart />
//             </View>
//         );
