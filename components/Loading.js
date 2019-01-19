/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View} from 'react-native';
import {Spinner} from 'native-base';

class Loading extends Component {
  /**
   * props:
   * visible: !boolean
   */
  render() {
    if (this.props.visible) {
      return (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000010',
            zIndex: 99999,
          }}>
          <Spinner color="red" />
        </View>
      );
    }
    return null;
  }
}

export default Loading;
