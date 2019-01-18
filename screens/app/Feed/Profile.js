/**
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, View, Dimensions, Alert, RefreshControl} from 'react-native';

import QRCode from 'react-native-qrcode';

import AppScreenWrapper from '../_wrapper';

import {Button, Tab, Tabs, Icon, Text, Thumbnail, Form, Item, Label, Content, Input, Toast} from 'native-base';
import {RAMUtils} from '../../../utils';
import {authApi, appApi} from '../../../api';
import {color} from '../../../styles';
var base64 = require('base-64');

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => <Icon name="account-location" type="MaterialCommunityIcons" style={{color: tintColor}} />,
    title: 'Profile',
  };

  constructor(props) {
    super(props);

    this.state = {
      user: RAMUtils.getUser(),
      loading: false,
      refreshing: false,
    };
  }

  onUpdateProfile = () => {
    this.setState({loading: true});
    appApi
      .updateProfile(this.state.user)
      .then(msg => {
        this.setState({loading: false});
        Alert.alert(msg);
      })
      .catch(err => {
        this.setState({loading: false});
        console.log(err);
        Alert.alert(err);
      });
  };

  handleRefresh = () => {
    appApi
      .fetchProfile(this.state.user.username)
      .then(user => {
        console.log(user);
        this.setState({refreshing: false, user});
      })
      .catch(err => {
        console.log(err);
        this.setState({refreshing: false});
      });
  };

  render() {
    const {user} = this.state;
    return (
      <AppScreenWrapper loading={this.state.loading}>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({refreshing: true});
                this.handleRefresh();
              }}
              colors={['#eb0025', '#f96e00', '#f4a21a', '#3c40cb', '#337ab7', '#176075']}
            />
          }>
          <View style={styles.avatarSection}>
            <View style={{position: 'absolute', top: 0, left: 0, height: 90, width: '100%', backgroundColor: color.primary}} />
            <Thumbnail
              source={user.photoUrl && user.photoUrl.length > 0 ? {url: user.photoUrl} : require('../../../assets/icons/default_avatar.png')}
              style={{width: 150, height: 150}}
            />
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Icon active type="MaterialCommunityIcons" name="account-box" />
              <Text style={{margin: 5}}>{user.username}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon active type="MaterialCommunityIcons" name="email" />
              <Text style={{margin: 5}}>{user.email}</Text>
            </View>
          </View>

          <View style={{backgroundColor: color.primary, paddingVertical: 4, paddingLeft: 10}}>
            <Text style={{color: color.white}}>Profile</Text>
          </View>
          <Form style={{padding: 10}}>
            <Item fixedLabel underline={false} bordered={false}>
              <Icon active name="rename-box" type="MaterialCommunityIcons" />
              <Label>First Name</Label>
              <Input
                defaultValue={user.firstName}
                maxLength={40}
                underlineColorAndroid="transparent"
                onChangeText={v => this.setState({user: {...this.state.user, firstName: v}})}
              />
            </Item>
            <Item fixedLabel underline={false} bordered={false} secureTextEntry>
              <Icon active name="rename-box" type="MaterialCommunityIcons" />
              <Label>Last Name</Label>
              <Input defaultValue={user.lastName} maxLength={40} underlineColorAndroid="transparent" onChangeText={v => this.setState({user: {...this.state.user, lastName: v}})} />
            </Item>
            <Item fixedLabel underline={false} bordered={false}>
              <Icon active type="MaterialCommunityIcons" name="phone-in-talk" />
              <Label>Tel</Label>
              <Input
                defaultValue={user.tel}
                editable={false}
                maxLength={45}
                underlineColorAndroid="transparent"
                onChangeText={v => this.setState({user: {...this.state.user, tel: v}})}
              />
            </Item>
            <Item fixedLabel underline={false} bordered={false}>
              <Icon active name="map-marker-radius" type="MaterialCommunityIcons" />
              <Label>Company</Label>
              <Input defaultValue={user.company} maxLength={40} underlineColorAndroid="transparent" onChangeText={v => this.setState({user: {...this.state.user, company: v}})} />
            </Item>
            <Item fixedLabel underline={false} bordered={false}>
              <Icon active name="folder-network" type="MaterialCommunityIcons" />
              <Label>Position</Label>
              <Input defaultValue={user.position} maxLength={40} underlineColorAndroid="transparent" onChangeText={v => this.setState({user: {...this.state.user, position: v}})} />
            </Item>
            <Button full danger bordered style={{marginVertical: 20}} onPress={() => this.onUpdateProfile()}>
              <Text>Update profile</Text>
            </Button>
          </Form>

          <View style={{backgroundColor: color.primary, paddingVertical: 4, paddingLeft: 10}}>
            <Text style={{color: color.white}}>Privacy</Text>
          </View>
          <Form style={{padding: 10}}>
            <Item floatingLabel underline={false} bordered={false}>
              <Label>Old Password</Label>
              <Input defaultValue={user.company} maxLength={40} underlineColorAndroid="transparent" secureTextEntry />
            </Item>
            <Item floatingLabel underline={false} bordered={false}>
              <Label>New Password</Label>
              <Input defaultValue={user.position} maxLength={40} underlineColorAndroid="transparent" secureTextEntry />
            </Item>
            <Item floatingLabel underline={false} bordered={false}>
              <Label>Confirm Password</Label>
              <Input defaultValue={user.position} maxLength={40} underlineColorAndroid="transparent" secureTextEntry />
            </Item>
            <Button full danger bordered style={{marginVertical: 20}}>
              <Text>Change password</Text>
            </Button>
          </Form>

          {/* <Tabs>
            <Tab heading="INFO" />
            <Tab heading="QR CODE">
              <View style={styles.qrcodeSection}>
                <QRCode
                  value={base64.encode(
                    JSON.stringify({
                      id: user.id,
                      fullname: user.firstName + user.lastName,
                      photoUrl: user.photoUrl,
                    }),
                  )}
                  size={Dimensions.get('screen').width * 0.88}
                  fgColor="white"
                />
                <Text style={{color: 'royalblue', fontSize: 19, fontStyle: 'italic', marginTop: 10}}> Scan this QR code to add contact</Text>
              </View>
            </Tab>
          </Tabs> */}

          {/* <Button full rounded danger onPress={this._onClickSignOut}>
            <Text>Sign me out</Text>
          </Button> */}
        </Content>
      </AppScreenWrapper>
    );
  }

  _onClickSignOut = async () => {
    authApi
      .logout()
      .then(() => this.props.navigation.navigate('Auth'))
      .catch(err => {
        console.log(err);
        this.props.navigation.navigate('Auth');
      });
  };
}

const styles = StyleSheet.create({
  avatarSection: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  qrcodeSection: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});
