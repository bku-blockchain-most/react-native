/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, RefreshControl} from 'react-native';
import {Text, Icon, Content, Header, Accordion, Button, Item, Input, Card, CardItem, Body, Thumbnail} from 'native-base';
import moment from 'moment';
import communications from 'react-native-communications';

import AppScreenWrapper from '../_wrapper';
import {appApi} from '../../../api';
import {handleError, testMatch, RAMUtils} from '../../../utils';
import {color} from '../../../styles';

class LogsContact extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => <Icon name="contacts" type="MaterialIcons" style={{color: tintColor}} />,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      refreshing: false,
      original: [], // { time, note, partner: { ... } }
      filter: [],
      item: this.props.navigation.getParam('item'),
    };
  }

  componentWillMount() {
    this.setState({loading: true});
    this.fetchRecords();
  }

  handleRefresh() {
    this.setState({refreshing: true});
    this.fetchRecords();
  }

  fetchRecords = () => {
    const {id} = this.state.item;
    appApi
      .fetchRecords(id)
      .then(records => {
        this.setState({
          loading: false,
          refreshing: false,
          original: records,
          filter: records,
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
      filter: this.state.original.filter(o => testMatch(pattern, o, ['time', 'note'])),
    });
  };

  renderItem = item => {
    return (
      <Card>
        <CardItem header bordered>
          <Text>{moment(item.time).calendar()}</Text>
        </CardItem>
        <CardItem bordered>
          <Body>
            <Text>{item.note}</Text>
          </Body>
        </CardItem>
      </Card>
    );
  };

  renderLogContent = () => {
    return (
      <View style={{padding: 5}}>
        <Accordion
          dataArray={this.state.filter.map(item => {
            // { time, note, partner: { ... } }
            return {
              title: moment(item.time).calendar() + ' - ' + (item.note || '').substring(0, 18) + '...',
              content: item.note,
            };
          })}
          expanded={0}
        />
        {/* <List dataArray={this.state.filter} renderRow={item => this.renderItem(item)} enableEmptySections />; */}
      </View>
    );
  };

  renderSearchBar = () => {
    return (
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search" placeholderTextColor={color.inactive} onChangeText={text => this.onSearchInputChanged(text)} />
        </Item>
      </Header>
    );
  };

  renderProfile = () => {
    const user = this.state.item;
    const userFullname = user.firstName + ' ' + user.lastName;
    const myFullname = RAMUtils.getUser().firstName + ' ' + RAMUtils.getUser().lastName;
    const message = `Hello ${userFullname},\nI'm ${myFullname}, ...`;

    return (
      <View style={styles.avatarSection}>
        <View style={{position: 'absolute', top: 0, left: 0, height: 80, width: '100%', backgroundColor: color.primary}} />
        <Button transparent style={{position: 'absolute', left: 10, top: 8}} onPress={() => this.props.navigation.goBack()}>
          <Icon name="ios-arrow-back" style={{color: color.white, fontSize: 26}} />
        </Button>
        <View style={{height: 160, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{flexDirection: 'row', flex: 1, height: 120, width: '100%', justifyContent: 'space-around', alignItems: 'center'}}>
            <Button
              rounded
              style={{backgroundColor: '#006acc', alignSelf: 'center', width: 54, height: 54, borderRadius: 27, justifyContent: 'center', padding: 0}}
              onPress={() => {
                communications.email([user.email], null, null, null, message);
              }}>
              <Icon name="email" type="MaterialCommunityIcons" />
            </Button>
            <Button
              style={{backgroundColor: '#ffc200', alignSelf: 'center', width: 48, height: 48, borderRadius: 24, justifyContent: 'center', padding: 0}}
              onPress={() => {
                communications.textWithoutEncoding(user.tel, message);
              }}>
              <Icon name="message" type="MaterialCommunityIcons" style={{fontSize: 20}} />
            </Button>
            <Thumbnail
              source={user.photoUrl && user.photoUrl.length > 0 ? {uri: user.photoUrl} : require('../../../assets/icons/default_avatar.png')}
              style={{width: 120, height: 120}}
            />
            <Button
              rounded
              style={{backgroundColor: '#00b65e', alignSelf: 'center', width: 48, height: 48, borderRadius: 24, justifyContent: 'center', padding: 0}}
              onPress={() => {
                communications.phonecall(user.tel, true);
              }}>
              <Icon name="ios-call" style={{fontSize: 20}} />
            </Button>
            <Button
              rounded
              style={{backgroundColor: '#d60022', alignSelf: 'center', width: 54, height: 54, borderRadius: 27, justifyContent: 'center', padding: 0}}
              onPress={() => this.handleAddRecord()}>
              <Icon name="plus" type="FontAwesome" />
            </Button>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Icon active type="MaterialCommunityIcons" name="account-box" />
          <Text style={{margin: 5}}>{user.username}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Icon active type="MaterialCommunityIcons" name="email" />
          <Text style={{margin: 5}}>{user.email}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, justifyContent: 'flex-end', flexDirection: 'row'}}>
            <Icon active name="map-marker-radius" type="MaterialCommunityIcons" />
            <Text numberOfLines={1} style={{margin: 5}}>
              {(user.company || 'Unknown').substring(0, 18)}
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'flex-start', flexDirection: 'row'}}>
            <Icon active name="folder-network" type="MaterialCommunityIcons" />
            <Text numberOfLines={1} style={{margin: 5}}>
              {(user.position || 'Unknown').substring(0, 18)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <AppScreenWrapper loading={this.state.loading}>
        <Content
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.handleRefresh()} colors={['#eb0025', '#f96e00', '#f4a21a', '#3c40cb', '#337ab7', '#176075']} />
          }>
          {this.renderProfile()}
          {/* {this.renderSearchBar()} */}
          <View style={{backgroundColor: color.primary, paddingVertical: 4, paddingLeft: 10, marginTop: 10, marginBottom: 15}}>
            <Text style={{color: color.white}}>Your records</Text>
          </View>
          {this.renderLogContent()}
        </Content>
      </AppScreenWrapper>
    );
  }

  handleAddRecord() {}
}

const styles = StyleSheet.create({
  avatarSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default LogsContact;
