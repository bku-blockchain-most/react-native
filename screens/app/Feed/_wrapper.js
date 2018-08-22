/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Content} from 'native-base';
import {StatusBar, Platform} from 'react-native';

import AppScreenWrapper from '../_wrapper';
import {color} from '../../../styles';

import Loading from '../../../components/Loading';

class FeedScreenWrapper extends Component {
  render() {
    const {isLoadingVisible} = this.props;
    return (
      <AppScreenWrapper>
        {Platform.select({
          android: (
            <StatusBar
              backgroundColor={color.primary}
              barStyle="light-content"
            />
          ),
          ios: (
            <StatusBar
              backgroundColor={color.primary}
              barStyle="dark-content"
            />
          ),
        })}
        <Content padder>
          <Loading isVisible={isLoadingVisible} />
          {this.props.children}
        </Content>
      </AppScreenWrapper>
    );
  }
}

export default FeedScreenWrapper;
