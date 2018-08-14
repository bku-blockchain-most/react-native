/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Alert} from 'react-native';
import {
  Button,
  Text,
  Container,
  Form,
  Item,
  Input,
  Label,
  H1,
  View,
} from 'native-base';

import {authApi} from '../../api';
import styles from '../../styles';

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
      <Container>
        <View style={styles.centerBox}>
          <H1>Forgot Password</H1>
          <Form
            style={{
              ...styles.fullWidth,
              paddingLeft: 10,
              paddingRight: 25,
              marginTop: 30,
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
              success
              full
              rounded
              style={{marginTop: 40, marginLeft: 15}}
              onPress={this._onClickForgotPassword}>
              <Text uppercase>Send</Text>
            </Button>
          </Form>

          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button
              transparent
              style={{marginTop: 10}}
              onPress={() => navigation.goBack()}>
              <Text>Back to login</Text>
            </Button>
          </View>
        </View>
      </Container>
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
      .catch(err => {
        console.log(err.response);
        Alert.alert(err.response.data);
      });
  };
}

export default ForgotScreen;
