/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, Icon, ListItem, Left, Right, Content, Container, Header, Item, Input} from 'native-base';

import _ from 'lodash';

import {FlatList} from 'react-native';

import AppScreenWrapper from '../_wrapper';
import {RAMUtils, handleError} from '../../../utils';
import {appApi} from '../../../api';

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

    this.user = RAMUtils.getUser();
  }

  componentWillMount() {
    this.fetchContacts();
  }

  fetchContacts = () => {
    this.setState({loading: true});
    appApi
      .fetchContacts()
      .then(contacts => {
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

  onSearchInputChanged = event => {
    const text = event.nativeEvent.text;
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

  renderItem = ({item}) => {
    const {displayName} = item;
    const {firstName, lastName} = displayName || {};
    return (
      <ListItem
        onPress={() => {
          this.props.navigation.navigate('Log');
        }}>
        <Left>
          <Text>{firstName + lastName}</Text>
        </Left>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    );
  };

  render() {
    return (
      <AppScreenWrapper loading={this.state.loading}>
        <Container>
          <Header searchBar rounded>
            <Item>
              <Icon name="ios-search" />
              <Input placeholder="Search" onChange={this.onSearchInputChanged} />
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
            <FlatList data={this.state.filter} renderItem={this.renderItem} enableEmptySections />
          </Content>
        </Container>
      </AppScreenWrapper>
    );
  }
}

export default ContactScreen;
