/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Alert} from 'react-native';
import {Button, Text, Form, Item, Input, Label, H2, View} from 'native-base';

import AuthScreenWrapper from './_Wrapper';
import {authApi} from '../../api';
import {styles, color} from '../../styles';
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
      <AuthScreenWrapper>
        <H2 style={{textTransform: 'uppercase'}}>Forgot Password</H2>
        <Form
          style={{
            ...styles.fullWidth,
            paddingLeft: 10,
            paddingRight: 25,
            marginTop: 10,
          }}>
          <Item floatingLabel>
            <Label>Enter your email</Label>
            <Input
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
            <Text uppercase>Send</Text>
          </Button>
        </Form>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Button
            transparent
            style={{marginTop: 10}}
            onPress={() => navigation.goBack()}>
            <Text style={styles.textPrimary}>Back to login</Text>
          </Button>
        </View>
      </AuthScreenWrapper>
    );
  }

  _onClickForgotPassword = () => {
    const {email} = this.state;
    authApi
      .forgotPassword(email)
      .then(message => {
        console.log(message);
        Alert.alert(message, '', [
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