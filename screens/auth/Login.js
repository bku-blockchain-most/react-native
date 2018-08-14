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
      <Container>
        <View style={styles.centerBox}>
          <H1>Login</H1>
          <Form
            style={{
              ...styles.fullWidth,
              paddingLeft: 10,
              paddingRight: 25,
              marginTop: 30,
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
              style={{marginTop: 40, marginLeft: 15}}
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
              <Text>Forgot Password?</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }

  _onClickLogin = () => {
    const {email, password} = this.state;
    authApi
      .login(email, password)
      .then(user => this.props.navigation.navigate('App', {user}))
      .catch(err => {
        console.log(err.response);
        Alert.alert(err.response.data);
      });
  };
}

export default LoginScreen;
