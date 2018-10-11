/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, Text, Form, Item, Input, Label, View} from 'native-base';

import AuthScreenWrapper from './_wrapper';

import {authApi} from '../../api';
import {styles} from '../../styles';
import {handleError} from '../../utils';

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
    console.log(this.state.email);
  }

  render() {
    const {navigation} = this.props;

    return (
      <AuthScreenWrapper title="Login">
        <Form
          style={{
            ...styles.fullWidth,
            paddingLeft: 10,
            paddingRight: 25,
            marginTop: 10,
          }}>
          <Item floatingLabel>
            <Label style={{...styles.fontOpenSans}}>Email</Label>
            <Input
              style={{...styles.fontOpenSans}}
              autoCapitalize="none"
              value={this.state.email}
              onChangeText={value => this.setState({email: value})}
            />
          </Item>
          <Item floatingLabel>
            <Label style={{...styles.fontOpenSans}}>Password</Label>
            <Input
              style={{...styles.fontOpenSans}}
              secureTextEntry
              defaultValue={this.state.password}
              onChangeText={value => this.setState({password: value})}
            />
          </Item>
          <Button
            success
            full
            rounded
            style={{marginTop: 40, marginLeft: 15, ...styles.bgPrimary}}
            onPress={this._onClickLogin}>
            <Text uppercase style={{...styles.fontOpenSans}}>
              Login
            </Text>
          </Button>
        </Form>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Button
            transparent
            style={{marginTop: 10}}
            onPress={() => navigation.navigate('Forgot', {email: this.state.email})}>
            <Text style={{...styles.textPrimary, ...styles.fontOpenSans}}>Forgot Password?</Text>
          </Button>
        </View>
      </AuthScreenWrapper>
    );
  }

  _onClickLogin = () => {
    const {email, password} = this.state;
    authApi
      .login(email, password)
      .then(user => this.props.navigation.navigate('App', {user}))
      .catch(err => handleError(err));
  };
}

export default LoginScreen;
