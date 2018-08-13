/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, Button} from 'native-base';

import {styles} from '../../styles';

class ForgotScreen extends Component {
  static navigationOptions = {
    title: 'Forgot Password',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button primary onPress={() => this.props.navigation.navigate('Login')}>
          <Text>Back to login</Text>
        </Button>
      </View>
    );
  }
}

export default ForgotScreen;
