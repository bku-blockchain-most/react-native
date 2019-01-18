/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, Text, Form, Item, Input, View, Toast, Icon} from 'native-base';

import AuthScreenWrapper, {customStyles} from './_wrapper';

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
      <AuthScreenWrapper loading={this.state.loading}>
        <Form style={{width: '86%'}}>
          <Item regular style={{...customStyles.input}}>
            <Icon active type="MaterialCommunityIcons" name="account-box" style={{color: color.primary}} />
            <Input
              placeholder="Username"
              placeholderTextColor={color.inactive}
              style={{...styles.fontRoboto}}
              value={this.state.username}
              onChangeText={value => {
                this.setState({username: value});
              }}
            />
          </Item>
          <Item regular style={{...customStyles.input}}>
            <Icon active type="MaterialCommunityIcons" name="key" style={{color: color.primary}} />
            <Input
              placeholder="Password"
              placeholderTextColor={color.inactive}
              style={{...styles.fontRoboto}}
              secureTextEntry
              value={this.state.password}
              onChangeText={value => this.setState({password: value})}
            />
          </Item>
          <Button full rounded style={{marginTop: 15, backgroundColor: color.primary}} onPress={this._onClickLogin}>
            <Text uppercase style={{...styles.fontRoboto, fontWeight: 'bold', fontSize: 18}}>
              Login
            </Text>
          </Button>
          <Button transparent style={{color: 'white', alignSelf: 'flex-end'}} onPress={() => navigation.navigate('Forgot')}>
            <Text style={{color: color.primaryLight, ...styles.fontRoboto, fontSize: 16}} uppercase={false}>
              Forgot Password?
            </Text>
          </Button>
          <View style={{backgroundColor: color.white, height: 0.2}} />
          <Button full rounded style={{marginTop: 20, backgroundColor: 'white', borderWidth: 0}} onPress={() => navigation.navigate('SignUp')}>
            <Text style={{...styles.fontRoboto, fontWeight: 'bold', color: color.primaryDark}}>Join with us</Text>
          </Button>
        </Form>
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
