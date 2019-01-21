/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, ViewPagerAndroid} from 'react-native';
import BoothShow from '../common/BoothShow';
import _ from 'lodash';

// return ( <BoothShow title = 'Blockchain'
//             descripsion = 'dadsa'
//             avatar = 'https://via.placeholder.com/300/09f/fff.png'
//             link = 'http://google.com'
//             ratingPoint = {4.5}
//             />
//         );

export default class GeneralPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let dt;
    if (this.props.filter == 'All') {
      dt = this.props.data.sort((a, b) => b.description.attend - a.description.attend);
    } else {
      dt = this.props.data.filter(item => item.category == this.props.filter).sort((a, b) => b.description.attend - a.description.attend.attend);
    }

    return (
      <View style={{flex: 1}}>
        <ViewPagerAndroid style={styles.viewPager} initialPage={0}>
          {dt.map((item, index) => {
            return (
              <View style={{flex: 1}}>
                <BoothShow key={index} data={item} />
              </View>
            );
          })}
        </ViewPagerAndroid>
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
