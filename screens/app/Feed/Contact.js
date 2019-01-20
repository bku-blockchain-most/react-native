/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {RefreshControl} from 'react-native';
import {Text, Icon, ListItem, List, Left, Right, Content, Body, Thumbnail, Header, Item, Input} from 'native-base';

import AppScreenWrapper from '../_wrapper';
import {handleError, testMatch} from '../../../utils';
import {appApi} from '../../../api';
import {color, refreshControlColors} from '../../../styles';

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
      refreshing: false,
    };
  }

  componentWillMount() {
    this.setState({loading: true});
    this.fetchContacts();
  }

  fetchContacts = () => {
    appApi
      .fetchContacts()
      .then(contacts => {
        this.setState({
          loading: false,
          refreshing: false,
          original: contacts,
          filter: contacts,
        });
      })
      .catch(err => {
        this.setState({loading: false, refreshing: false});
        handleError(err);
      });
  };

  onSearchInputChanged = text => {
    const pattern = new RegExp(text, 'i');
    this.setState({
      filter: this.state.original.filter(o => testMatch(pattern, o, ['firstName', 'lastName', 'username', 'email'])),
    });
  };

  handleRefresh = () => {
    this.setState({refreshing: true});
    this.fetchContacts();
  };

  renderItem = item => {
    const {firstName, lastName, photoUrl, tel} = item || {};
    return (
      <ListItem avatar onPress={() => this.props.navigation.navigate('LogsContact', {profile: item})}>
        <Left>
          <Thumbnail source={photoUrl && photoUrl.length > 0 ? {uri: photoUrl} : require('../../../assets/icons/default_avatar.png')} small />
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
            <Input placeholder="Search contacts" placeholderTextColor={color.inactive} onChangeText={text => this.onSearchInputChanged(text)} />
            <Icon name="qrcode-scan" type="MaterialCommunityIcons" onPress={() => this.props.navigation.navigate('QrCodeScannerContact')} />
          </Item>
        </Header>
        <Content refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.handleRefresh()} colors={refreshControlColors} />}>
          <List dataArray={this.state.filter} renderRow={item => this.renderItem(item)} enableEmptySections />
        </Content>
      </AppScreenWrapper>
    );
  }
}

export default ContactScreen;
