/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {List, Header, Body, Title, Left, Right, Item, Input, Button, Icon, Text, Textarea, Form, Toast} from 'native-base';

import AppScreenWrapper from '../_wrapper';
import {color} from '../../../styles';
import {appApi} from '../../../api';

class CreatingContact extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => <Icon name="account-location" type="MaterialCommunityIcons" style={{color: tintColor}} />,
  };

  constructor(props) {
    super(props);

    const partnerJSONString = this.props.navigation.getParam('partnerJSONString');
    let partner = this.formUserProfile();
    if (partnerJSONString) {
      partner = JSON.parse(partnerJSONString) || this.formUserProfile();
    }

    this.state = {
      loading: false,
      partner,
      note: '',
    };
  }

  formUserProfile = () => ({
    username: '',
    email: '',
    tel: '',
    displayName: {
      firstName: '',
      lastName: '',
    },
    company: '',
    position: '',
  });

  onAddPressed = () => {
    this.setState({loading: true});
    Toast.show({
      text: 'Successfully',
      buttonText: 'Ok',
      buttonTextStyle: {color: '#008000'},
      buttonStyle: {backgroundColor: '#5cb85c'},
    });
    // this.props.navigation.navigate('Contact');
  };

  render() {
    const {partner} = this.state;
    return (
      <AppScreenWrapper loading={this.state.loading}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>New Contact</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.onAddPressed()}>
              <Icon name="md-checkmark" color={color.white} />
            </Button>
          </Right>
        </Header>
        <List>
          <Item>
            <Text style={{width: 80, marginLeft: 5}}>Username</Text>
            <Input placeholder="Enter username" value={partner.username} onChangeText={val => this.setState({partner: {...partner, username: val}})} />
          </Item>

          <Item>
            <Text style={{width: 80, marginLeft: 5}}>Email</Text>
            <Input placeholder="Enter email" value={partner.email} onChangeText={val => this.setState({partner: {...partner, email: val}})} />
          </Item>

          <Item>
            <Text style={{width: 80, marginLeft: 5}}>First name</Text>
            <Input
              placeholder="Enter first name"
              value={partner.displayName.firstName}
              onChangeText={val => this.setState({partner: {...partner, displayName: {...partner.displayName, firstName: val}}})}
            />
          </Item>

          <Item>
            <Text style={{width: 80, marginLeft: 5}}>Last name</Text>
            <Input
              placeholder="Enter last name"
              value={partner.displayName.lastName}
              onChangeText={val => this.setState({partner: {...partner, displayName: {...partner.displayName, lastName: val}}})}
            />
          </Item>

          <Item>
            <Text style={{width: 80, marginLeft: 5}}>Tel</Text>
            <Input placeholder="Enter telephone" value={partner.tel} onChangeText={val => this.setState({partner: {...partner, tel: val}})} />
          </Item>

          <Item>
            <Text style={{width: 80, marginLeft: 5}}>Company</Text>
            <Input placeholder="Enter company" value={partner.company} onChangeText={val => this.setState({partner: {...partner, company: val}})} />
          </Item>

          <Item>
            <Text style={{width: 80, marginLeft: 5}}>Position</Text>
            <Input placeholder="Enter position" value={partner.position} onChangeText={val => this.setState({partner: {...partner, position: val}})} />
          </Item>

          <Form>
            <Textarea rowSpan={5} bordered placeholder="Note" placeholderTextColor={color.inactive} value={this.state.note} onChangeText={note => this.setState({note})} />
          </Form>
        </List>
      </AppScreenWrapper>
    );
  }
}

export default CreatingContact;
