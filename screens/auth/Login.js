/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Text, Form, Item, Input, View, Toast, Icon} from 'native-base';

import AuthScreenWrapper from './_wrapper';

import {authApi} from '../../api';
import {styles, color} from '../../styles';
import {handleError} from '../../utils';

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loading: false,
    };
  }

  render() {
    const {navigation} = this.props;

    return (
      <AuthScreenWrapper title="LOGIN" loading={this.state.loading}>
        <Form style={{...styles.fullWidth}}>
          <Item regular style={{...xstyles.input}}>
            <Icon active type="MaterialCommunityIcons" name="account-box" style={{color: color.accent}} />
            <Input
              placeholder="Username"
              style={{...styles.fontOpenSans}}
              value={this.state.username}
              onChangeText={value => {
                this.setState({username: value});
              }}
            />
          </Item>
          <Item regular style={{...xstyles.input}}>
            <Icon active type="MaterialCommunityIcons" name="key" style={{color: color.accent}} />
            <Input placeholder="Password" style={{...styles.fontOpenSans}} secureTextEntry value={this.state.password} onChangeText={value => this.setState({password: value})} />
          </Item>
        </Form>
        <Button full rounded style={{marginTop: 20, backgroundColor: color.accent}} onPress={this._onClickLogin}>
          <Text uppercase style={{...styles.fontOpenSans, fontWeight: 'bold', fontSize: 20}}>
            Login
          </Text>
        </Button>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Button transparent style={{marginTop: 5, color: 'white'}} onPress={() => navigation.navigate('Forgot')}>
            <Text style={{color: 'white', ...styles.fontOpenSans}}>Forgot Password?</Text>
          </Button>
        </View>
        <View style={{width: '100%', height: 1, backgroundColor: 'white', marginTop: 8, marginBottom: 3}} />
        <Button full rounded bordered danger style={{marginTop: 10, backgroundColor: 'white'}} onPress={() => navigation.navigate('SignUp')}>
          <Text style={{...styles.fontOpenSans, color: color.primaryDark}}>Sign Up</Text>
        </Button>
      </AuthScreenWrapper>
    );
  }

  _onClickLogin = () => {
    const {username, password} = this.state;

    if (username.length === 0 || password.length === 0) {
      return Toast.show({
        text: "Username and password can't be empty",
        buttonText: 'OK',
        duration: 3000,
      });
    }

    this.setState({loading: true});

    authApi
      .login(username, password)
      .then(() => {
        console.log('Login successfully');
        this.setState({loading: false});
        this.props.navigation.navigate('App');
      })
      .catch(err => {
        this.setState({loading: false});
        handleError(err);
      });
  };
}

export default LoginScreen;

const xstyles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    marginVertical: 8,
  },
});
