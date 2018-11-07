/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, Text, Form, Item, Input, Icon} from 'native-base';
import {StyleSheet} from 'react-native';
import AuthScreenWrapper from './_wrapper';
import {styles, color} from '../../styles';

class ForgotScreen extends Component {
  static navigationOptions = {
    title: 'Forgot Password',
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
    };
  }

  render() {
    const {navigation} = this.props;

    return (
      <AuthScreenWrapper title="FORGOT PASSWORD" showButtonBack={true} navigation={navigation}>
        <Form style={{...styles.fullWidth}}>
          <Item regular style={{...xstyles.input}}>
            <Icon active type="MaterialCommunityIcons" name="email" style={{color: color.accent}} />
            <Input
              placeholder="Email"
              placeholderTextColor={color.inactive}
              style={{...styles.fontOpenSans}}
              value={this.state.username}
              onChangeText={value => {
                this.setState({email: value});
              }}
            />
          </Item>
        </Form>

        <Button full rounded style={{marginTop: 20, backgroundColor: color.accent}} onPress={this._onClickForgotPassword}>
          <Text uppercase style={{...styles.fontOpenSans, fontWeight: 'bold', fontSize: 20}}>
            Send
          </Text>
        </Button>
      </AuthScreenWrapper>
    );
  }

  _onClickForgotPassword = () => {
    this.props.navigation.goBack();
  };
}

export default ForgotScreen;

const xstyles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    marginVertical: 8,
  },
});
