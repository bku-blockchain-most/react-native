/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import {Button, Text, View} from 'native-base';

import {styles} from '../../styles';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome to the app!',
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
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
      <View style={styles.container}>
        <Button
          primary
          onPress={() =>
            this.props.navigation.navigate('Polling', {
              polling,
            })
          }>
          <Text>Go to one polling</Text>
        </Button>
        <Button danger onPress={this._signOutAsync}>
          <Text>Sign me out</Text>
        </Button>
      </View>
    );
  }
}

export default HomeScreen;
