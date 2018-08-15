/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, Text, Content} from 'native-base';

import AppScreenWrapper from './_wrapper';

class PollingDetailScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const polling = navigation.getParam('polling', {name: 'Polling Default'});
    return {
      title: polling.name,
    };
  };

  render() {
    const {navigation} = this.props;
    const polling = navigation.getParam('polling');
    console.log(polling);

    return (
      <AppScreenWrapper>
        <Content padder>
          <Text>Hello Polling</Text>
          <Text>{polling.name}</Text>
          {polling.options.map(o => (
            <Text key={o.id}>
              {o.id}. {o.name}
            </Text>
          ))}
          <Button warning onPress={() => navigation.goBack()}>
            <Text>Go Back</Text>
          </Button>
        </Content>
      </AppScreenWrapper>
    );
  }
}

export default PollingDetailScreen;
