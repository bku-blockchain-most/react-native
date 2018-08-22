/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View} from 'react-native';
import Spinner from 'react-native-spinkit';
import {color} from '../styles';

class Loading extends Component {
  render() {
    if (this.props.isVisible) {
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
            backgroundColor: '#00000050',
            zIndex: 99999,
          }}>
          <Spinner
            isVisible={true}
            type={'9CubeGrid'}
            size={100}
            color={color.primary}
          />
        </View>
      );
    }
    return null;
  }
}

export default Loading;
