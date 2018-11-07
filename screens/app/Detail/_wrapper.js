/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Header, Left, Body, Right, Button, Icon, Title} from 'native-base';

import AppScreenWrapper from '../_wrapper';

class DetailScreenWrapper extends Component {
  /**
   * props:
   * loading: !boolean
   */
  render() {
    const {navigation, titleHeader, hasTabs} = this.props;

    return (
      <AppScreenWrapper loading={this.props.loading}>
        <Header hasTabs={hasTabs}>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{titleHeader}</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Right>
        </Header>

        {this.props.children}
      </AppScreenWrapper>
    );
  }
}

export default DetailScreenWrapper;
