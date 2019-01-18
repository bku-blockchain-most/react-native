/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Alert} from 'react-native';
import {Button, Text, Form, Item, Input, Toast, Icon} from 'native-base';

import AuthScreenWrapper, {customStyles} from './_wrapper';

import {authApi} from '../../api';
import {styles, color} from '../../styles';
import {handleError} from '../../utils';

class SignUpScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      tel: '',
      password: '',
      confirmPassword: '',
      loading: false,
    };
  }

  render() {
    const {navigation} = this.props;

    return (
      <AuthScreenWrapper showButtonBack={true} navigation={navigation} loading={this.state.loading}>
        <Form style={{width: '86%'}}>
          <Item regular style={{...customStyles.input}}>
            <Icon active type="MaterialCommunityIcons" name="account-box" style={{color: color.accent}} />
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
            <Icon active type="MaterialCommunityIcons" name="email" style={{color: color.accent}} />
            <Input
              placeholder="Email"
              placeholderTextColor={color.inactive}
              style={{...styles.fontRoboto}}
              value={this.state.email}
              onChangeText={value => {
                this.setState({email: value});
              }}
            />
          </Item>
          <Item regular style={{...customStyles.input}}>
            <Icon active type="MaterialCommunityIcons" name="phone-in-talk" style={{color: color.accent}} />
            <Input
              placeholder="Tel"
              placeholderTextColor={color.inactive}
              style={{...styles.fontRoboto}}
              value={this.state.tel}
              onChangeText={value => {
                this.setState({tel: value});
              }}
            />
          </Item>
          <Item regular style={{...customStyles.input}}>
            <Icon active type="MaterialCommunityIcons" name="key" style={{color: color.accent}} />
            <Input
              placeholder="Password"
              placeholderTextColor={color.inactive}
              style={{...styles.fontRoboto}}
              secureTextEntry
              value={this.state.password}
              onChangeText={value => this.setState({password: value})}
            />
          </Item>
          <Item regular style={{...customStyles.input}}>
            <Icon active type="MaterialCommunityIcons" name="key-plus" style={{color: color.accent}} />
            <Input
              placeholder="Confirm Password"
              placeholderTextColor={color.inactive}
              style={{...styles.fontRoboto}}
              secureTextEntry
              value={this.state.confirmPassword}
              onChangeText={value => this.setState({confirmPassword: value})}
            />
          </Item>
          <Button full rounded style={{marginTop: 20, backgroundColor: color.accent}} onPress={this._onClickSignUp}>
            <Text uppercase style={{...styles.fontRoboto, fontWeight: 'bold', fontSize: 20}}>
              Create Account
            </Text>
          </Button>
        </Form>
      </AuthScreenWrapper>
    );
  }

  _onClickSignUp = () => {
    const {username, email, tel, password, confirmPassword} = this.state;

    if (username == '' || email == '' || tel == '' || password == '' || confirmPassword == '') {
      return Toast.show({
        text: 'Please fill full the information',
        buttonText: 'OK',
        duration: 3000,
      });
    }

    if (password != confirmPassword) {
      return Toast.show({
        text: 'Confirm password is not matching',
        buttonText: 'OK',
        duration: 3000,
      });
    }

    this.setState({loading: true});

    authApi
      .signup(username, email, tel, password)
      .then(() => {
        console.log('Sign Up successfully');

        this.setState({loading: false});

        Alert.alert('Success', 'Create account successfully', [
          {
            text: 'OK',
            onPress: () => {
              this.props.navigation.goBack();
            },
          },
        ]);
      })
      .catch(err => {
        this.setState({loading: false});
        handleError(err);
      });
  };
}

export default SignUpScreen;
