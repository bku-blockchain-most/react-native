/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, Text, View} from 'native-base';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    const polling = {
      name: 'What language?',
      options: [
        {id: 1, name: 'Node.JS'},
        {id: 2, name: 'PHP'},
        {id: 3, name: 'Django'},
        {id: 4, name: 'Ruby on Rails'},
      ],
    };

    return (
      <View>
        <Text>Hello Home</Text>
        <Button
          primary
          onPress={() =>
            this.props.navigation.navigate('Polling', {
              polling,
            })
          }>
          <Text>Home Screen</Text>
        </Button>
      </View>
    );
  }
}

export default HomeScreen;
