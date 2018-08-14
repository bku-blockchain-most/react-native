/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, Text, View} from 'native-base';

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
      <View>
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
      </View>
    );
  }
}

export default PollingDetailScreen;