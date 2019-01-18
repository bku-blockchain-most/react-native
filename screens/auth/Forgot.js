/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, Text, Form, Item, Input, Icon} from 'native-base';
import AuthScreenWrapper, {customStyles} from './_wrapper';
import {styles, color} from '../../styles';

class ForgotScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
    };
  }

  render() {
    const {navigation} = this.props;

    return (
      <AuthScreenWrapper showButtonBack={true} navigation={navigation}>
        <Form style={{width: '86%'}}>
          <Item regular style={{...customStyles.input}}>
            <Icon active type="MaterialCommunityIcons" name="email" style={{color: color.primary}} />
            <Input
              placeholder="Email"
              placeholderTextColor={color.inactive}
              style={{...styles.fontRoboto}}
              value={this.state.username}
              onChangeText={value => {
                this.setState({email: value});
              }}
            />
          </Item>

          <Button full rounded style={{marginTop: 20, backgroundColor: color.primary}} onPress={this._onClickForgotPassword}>
            <Text style={{...styles.fontRoboto, fontWeight: 'bold', fontSize: 18}}>Reset Password</Text>
          </Button>
        </Form>
      </AuthScreenWrapper>
    );
  }

  _onClickForgotPassword = () => {
    this.props.navigation.goBack();
  };
}

export default ForgotScreen;
