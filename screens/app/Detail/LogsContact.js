/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, RefreshControl, Modal, Alert} from 'react-native';
import {Text, Icon, Content, Header, Textarea, Toast, Form, H2, Accordion, Button, Item, Input, Card, CardItem, Body, Thumbnail} from 'native-base';
import moment from 'moment';
import communications from 'react-native-communications';

import AppScreenWrapper from '../_wrapper';
import {appApi} from '../../../api';
import {handleError, testMatch, RAMUtils} from '../../../utils';
import {color, refreshControlColors} from '../../../styles';

class LogsContact extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => <Icon name="contacts" type="MaterialIcons" style={{color: tintColor}} />,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      refreshing: false,

      original: [], // { time, note, partner: { ... } }
      filter: [],

      profile: null,
      inContactList: false,

      note: '',
      showNote: false,
    };

    this.profileID = this.props.navigation.getParam('profileID'); // scan QR Code, should fetching user by ID
    if (!this.profileID || this.profileID === '') {
      this.state.inContactList = true;
      this.state.profile = this.props.navigation.getParam('profile'); // contact in contacts list
    } else {
      // Check if this profile in contact list
      const myContacts = RAMUtils.getContacts();
      if (myContacts.find(o => o.id === this.profileID)) {
        this.state.inContactList = true; // in contact list but no have profile
      }
    }
  }

  componentWillMount() {
    if (this.state.profile) {
      // have profile, fetching records
      setTimeout(() => this.fetchRecords(), 200); // prevent flash loading
    } else {
      setTimeout(() => this.fetchUser(), 200); // prevent flash loading
    }
  }

  fetchUser() {
    appApi
      .fetchUserProfileByID(this.profileID)
      .then(profile => {
        if (this.state.inContactList) {
          // this profile is in contacts, should fetch records
          this.setState({profile});
          this.fetchRecords();
        } else {
          // new profile
          this.setState({profile, loading: false});
        }
      })
      .catch(err => {
        this.setState({loading: false});
        handleError(err);
      });
  }

  handleRefresh() {
    this.setState({refreshing: true});
    this.fetchRecords();
  }

  fetchRecords = () => {
    const {id} = this.state.profile;
    appApi
      .fetchRecords(id)
      .then(records =>
        this.setState({
          loading: false,
          refreshing: false,
          original: records,
          filter: records,
        }),
      )
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

  addToContact() {
    this.setState({loading: true});
    setTimeout(() => {
      appApi
        .addContact(this.profileID)
        .then(() => this.setState({loading: false, inContactList: true}))
        .catch(err => {
          this.setState({loading: false});
          handleError(err);
        });
    }, 200);
  }

  onSaveRecord = () => {
    this.setState({loading: true});
    appApi
      .addRecord(this.state.profile.id, this.state.note)
      .then(() => {
        Alert.alert('Successfully', 'Record has been saved successfully.');
        this.setState({loading: false, showNote: false});
      })
      .catch(err => {
        this.setState({loading: false});
        handleError(err);
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
    const user = this.state.profile;
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
              disabled={!this.state.inContactList}
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

  renderModalAddNote() {
    const userFullname = this.state.profile.firstName + ' ' + this.state.profile.lastName;
    return (
      <Modal visible={this.state.showNote} animationType="slide" onDismiss={() => this.setState({loading: false})}>
        <View style={{padding: 20}}>
          <H2 style={{marginTop: 15}}>Add Note</H2>
          <Text style={{marginTop: 20}}>Recording with {userFullname}</Text>
          <Form style={{marginBottom: 5, marginTop: 15}}>
            <Textarea rowSpan={8} bordered placeholder="Add your note..." value={this.state.note} onChangeText={note => this.setState({note: note})} />
            <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 5, marginTop: 10}}>
              <Button dark onPress={() => this.setState({showNote: false})} style={{margin: 3}}>
                <Text>Cancel</Text>
              </Button>
              <Button danger style={{margin: 3}} onPress={() => this.onSaveRecord()}>
                <Text>Save Record</Text>
              </Button>
            </View>
          </Form>
        </View>
      </Modal>
    );
  }

  render() {
    return (
      <AppScreenWrapper loading={this.state.loading}>
        <Content refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.handleRefresh()} colors={refreshControlColors} />}>
          {this.state.profile ? this.renderProfile() : null}
          {/* {this.renderSearchBar()} */}
          {this.state.inContactList && (
            <View style={{backgroundColor: color.primary, paddingVertical: 4, paddingLeft: 10, marginTop: 10, marginBottom: 15}}>
              <Text style={{color: color.white}}>Your records</Text>
            </View>
          )}
          {this.state.inContactList ? this.renderLogContent() : null}
          {this.state.profile &&
            !this.state.inContactList && (
              <Button primary full bordered transparent style={{alignSelf: 'center', marginTop: 20}} onPress={() => this.addToContact()}>
                <Text>Add To Contact</Text>
              </Button>
            )}

          {this.renderModalAddNote()}
        </Content>
      </AppScreenWrapper>
    );
  }

  handleAddRecord() {
    this.setState({showNote: true});
  }
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
