/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Header, Left, Body, Right, Button, Icon, Title} from 'native-base';

import AppScreenWrapper from '../_wrapper';

import Loading from '../../../components/Loading';

class DetailScreenWrapper extends Component {
  render() {
    const {navigation, titleHeader, hasTabs, isLoadingVisible} = this.props;

    return (
      <AppScreenWrapper>
        <Loading isVisible={isLoadingVisible} />
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
