/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, Text, Form, Item, Input, Label, H2, View} from 'native-base';

import AuthScreenWrapper from './_Wrapper';

import {authApi} from '../../api';
import {styles, color} from '../../styles';
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
      <AuthScreenWrapper>
        <H2 style={{textTransform: 'uppercase'}}>Login</H2>
        <Form
          style={{
            ...styles.fullWidth,
            paddingLeft: 10,
            paddingRight: 25,
            marginTop: 10,
          }}>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCapitalize="none"
              value={this.state.email}
              onChangeText={value => this.setState({email: value})}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
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
            <Text uppercase>Login</Text>
          </Button>
        </Form>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Button
            transparent
            style={{marginTop: 10}}
            onPress={() =>
              navigation.navigate('Forgot', {email: this.state.email})
            }>
            <Text style={styles.textPrimary}>Forgot Password?</Text>
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
