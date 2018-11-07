/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, Icon, ListItem, List, Left, Right, Content, Body, Thumbnail, Header, Item, Input} from 'native-base';

import AppScreenWrapper from '../_wrapper';
import {handleError} from '../../../utils';
import {appApi} from '../../../api';
import {color} from '../../../styles';

class ContactScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => <Icon name="contacts" type="MaterialIcons" style={{color: tintColor}} />,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      original: [],
      filter: [],
    };
  }

  componentWillMount() {
    this.fetchContacts();
  }

  fetchContacts = () => {
    this.setState({loading: true});
    appApi
      .fetchContacts()
      .then(contacts => {
        console.log(contacts);
        this.setState({
          loading: false,
          original: contacts,
          filter: contacts,
        });
      })
      .catch(err => {
        this.setState({loading: false});
        handleError(err);
      });
  };

  onSearchInputChanged = text => {
    const pattern = new RegExp(text, 'i');
    this.setState({
      filter: this.state.original.filter(
        o =>
          o.uid.displayName.firstName.search(pattern) !== -1 ||
          o.uid.displayName.lastName.search(pattern) !== -1 ||
          o.uid.username.search(pattern) !== -1 ||
          o.uid.email.search(pattern) !== -1,
      ),
    });
  };

  renderItem = item => {
    const {displayName, photoUrl, tel} = item.uid || {};
    const {firstName, lastName} = displayName || {};
    return (
      <ListItem
        avatar
        onPress={() => {
          this.props.navigation.navigate('Log');
        }}>
        <Left>
          <Thumbnail source={{uri: photoUrl}} small />
        </Left>
        <Body>
          <Text>{firstName + ' ' + lastName}</Text>
          <Text>{tel}</Text>
        </Body>
        <Right style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    );
  };

  render() {
    return (
      <AppScreenWrapper loading={this.state.loading}>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" placeholderTextColor={color.inactive} onChangeText={text => this.onSearchInputChanged(text)} />
            <Icon
              name="qrcode-scan"
              type="MaterialCommunityIcons"
              onPress={() => {
                this.props.navigation.navigate('QRCodeScanerContact');
              }}
            />
          </Item>
        </Header>
        <Content>
          <List dataArray={this.state.filter} renderRow={item => this.renderItem(item)} enableEmptySections />
        </Content>
      </AppScreenWrapper>
    );
  }
}

export default ContactScreen;
