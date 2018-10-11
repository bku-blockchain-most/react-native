/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Alert} from 'react-native';
import {Button, Text, Form, Item, Input, Label, View} from 'native-base';

import AuthScreenWrapper from './_wrapper';
import {authApi} from '../../api';
import {styles} from '../../styles';
import {handleError} from '../../utils';

class ForgotScreen extends Component {
  static navigationOptions = {
    title: 'Forgot Password',
  };

  constructor(props) {
    super(props);

    this.state = {
      email: this.props.navigation.getParam('email', ''),
    };
  }

  render() {
    const {navigation} = this.props;

    const defaultEmail = navigation.getParam('email', '');

    return (
      <AuthScreenWrapper title="Forgot Password">
        <Form
          style={{
            ...styles.fullWidth,
            paddingLeft: 10,
            paddingRight: 25,
            marginTop: 10,
          }}>
          <Item floatingLabel>
            <Label style={{...styles.fontOpenSans}}>Enter your email</Label>
            <Input
              style={{...styles.fontOpenSans}}
              autoCapitalize="none"
              defaultValue={defaultEmail}
              value={this.state.email}
              onChangeText={value => this.setState({email: value})}
            />
          </Item>
          <Button
            full
            rounded
            style={{marginTop: 40, marginLeft: 15, ...styles.bgPrimary}}
            onPress={this._onClickForgotPassword}>
            <Text uppercase style={{...styles.fontOpenSans}}>
              Send
            </Text>
          </Button>
        </Form>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Button transparent style={{marginTop: 10}} onPress={() => navigation.goBack()}>
            <Text style={{...styles.textPrimary, ...styles.fontOpenSans}}>Back to login</Text>
          </Button>
        </View>
      </AuthScreenWrapper>
    );
  }

  _onClickForgotPassword = () => {
    const {email} = this.state;
    authApi
      .forgotPassword(email)
      .then(data => {
        console.log(data);
        Alert.alert(data.message, '', [
          {
            text: 'OK',
            onPress: () => {
              this.props.navigation.navigate('Login', {email});
            },
          },
        ]);
      })
      .catch(err => handleError(err));
  };
}

export default ForgotScreen;
