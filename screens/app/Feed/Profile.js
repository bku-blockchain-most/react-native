/**
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, View, Dimensions, Alert, RefreshControl, Modal} from 'react-native';
import {Button, Icon, Text, Thumbnail, Form, Item, Label, Content, Input, Spinner, Badge, ListItem, List, Left, Right, Body, H2} from 'native-base';
import QRCode from 'react-native-qrcode';
import * as jws from '../../../utils/jws';

import AppScreenWrapper from '../_wrapper';

import {RAMUtils, handleError} from '../../../utils';
import {authApi, appApi} from '../../../api';
import {color, refreshControlColors} from '../../../styles';

let intervalQRCodeCountDown;

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => <Icon name="account-card-details" type="MaterialCommunityIcons" style={{color: tintColor}} />,
  };

  constructor(props) {
    super(props);

    this.state = {
      user: RAMUtils.getUser(),
      loading: false,
      refreshing: false,

      qrcodeCountDown: 60,
      qrcodeContent: null,

      showDialog: false,
      showQrCode: false,
      showChangePassword: false,

      oldPassword: '',
      newPassword: '',
      confirmPass: '',
    };
  }

  addQrCodeCountDown = () => {
    this.clearQrCodeCountDown();
    intervalQRCodeCountDown = setInterval(() => {
      if (this.state.qrcodeCountDown > 0) {
        this.setState({qrcodeCountDown: this.state.qrcodeCountDown - 1});
      } else {
        this.clearQrCodeCountDown();
      }
    }, 1000);
  };

  clearQrCodeCountDown() {
    clearInterval(intervalQRCodeCountDown);
  }

  onShareQrCode = () => {
    this.setState({showQrCode: true});
    setTimeout(() => {
      this.refreshQRCode();
    }, 200);
  };

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
    this.setState({refreshing: true});
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

  retrieveDataQRCode = () => {
    const {user} = this.state;
    return {id: user.id};
  };

  refreshQRCode = () => {
    this.clearQrCodeCountDown();
    const data = this.retrieveDataQRCode();
    jws.generate(data, signature => {
      this.setState({qrcodeCountDown: 60, qrcodeContent: signature});
      this.addQrCodeCountDown();
    });
  };

  renderModalChangePassword() {
    return (
      <Modal visible={this.state.showChangePassword} animationType="slide">
        <View style={{padding: 20}}>
          <H2 style={{marginTop: 15}}>Change Password</H2>
          <Form style={{marginBottom: 5, marginTop: 20}}>
            <Item regular underline={false} bordered={false} style={{marginVertical: 5}}>
              <Input
                placeholder="Old Password"
                placeholderTextColor={color.inactive}
                maxLength={40}
                underlineColorAndroid="transparent"
                secureTextEntry
                onChangeText={v => this.setState({oldPassword: v})}
              />
            </Item>
            <Item regular underline={false} bordered={false} style={{marginVertical: 5}}>
              <Input
                placeholder="New Password"
                placeholderTextColor={color.inactive}
                maxLength={40}
                underlineColorAndroid="transparent"
                secureTextEntry
                onChangeText={v => this.setState({newPassword: v})}
              />
            </Item>
            <Item regular underline={false} bordered={false} style={{marginVertical: 5}}>
              <Input
                placeholder="Confirm Password"
                placeholderTextColor={color.inactive}
                maxLength={40}
                underlineColorAndroid="transparent"
                secureTextEntry
                onChangeText={v => this.setState({confirmPass: v})}
              />
            </Item>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 5, marginTop: 10}}>
              <Button dark onPress={() => this.setState({showChangePassword: false})} style={{margin: 3}}>
                <Text>Cancel</Text>
              </Button>
              <Button danger style={{margin: 3}} onPress={() => this.onChangePassword()}>
                <Text>Change password</Text>
              </Button>
            </View>
          </Form>
        </View>
      </Modal>
    );
  }

  renderModalLogout() {
    const dialogSize = Math.round((Dimensions.get('screen').width * 4) / 5);
    return (
      <Modal visible={this.state.showDialog} transparent animationType="none">
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000050'}}>
          <View style={{flexDirection: 'column', paddingHorizontal: 20, paddingVertical: 15, backgroundColor: color.white, width: dialogSize, borderRadius: 12}}>
            <Text style={{marginVertical: 15, fontSize: 18}}>Do you want to logout?</Text>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 5}}>
              <Button dark onPress={() => this.setState({showDialog: false})} style={{margin: 3}}>
                <Text>Cancel</Text>
              </Button>
              <Button danger onPress={this._onClickSignOut} style={{margin: 3}}>
                <Text>OK</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderModalQrCode() {
    const qrcodeSize = 256;
    return (
      <Modal visible={this.state.showQrCode} animationType="slide">
        <View style={{padding: 20, alignItems: 'center', flex: 1}}>
          <H2 style={{marginTop: 15}}>Share your QR Code</H2>
          <View style={styles.qrcodeSection}>
            {this.state.qrcodeContent ? (
              <QRCode value={this.state.qrcodeContent} size={qrcodeSize} fgColor="white" />
            ) : (
              <View style={{height: qrcodeSize, width: qrcodeSize, justifyContent: 'center', alignItems: 'center', flex: 1}}>
                <Spinner color="red" />
              </View>
            )}
            <Text style={{fontSize: 15, marginVertical: 20}}>Scan QR code to add contact</Text>
            <Badge danger={this.state.qrcodeCountDown === 0} warning={this.state.qrcodeCountDown > 0} style={{alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 18, textAlign: 'center', paddingHorizontal: 16, paddingVertical: 8}}>
                {this.state.qrcodeCountDown === 0 ? 'Expired' : `${this.state.qrcodeCountDown} s`}
              </Text>
            </Badge>
            <View style={{flexDirection: 'row', flex: 1, width: qrcodeSize, justifyContent: 'space-around', marginTop: 20}}>
              <Button
                dark
                full
                iconRight
                onPress={() => {
                  this.setState({showQrCode: false});
                  this.clearQrCodeCountDown();
                }}
                style={{flex: 1}}>
                <Text>Close</Text>
                <Icon name="close" type="MaterialCommunityIcons" />
              </Button>
              <Button full primary iconLeft onPress={() => this.refreshQRCode()} style={{flex: 1}}>
                <Icon name="refresh" />
                <Text>Refresh</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderFormUpdateProfile() {
    const {user} = this.state;
    return (
      <Form style={{paddingLeft: 2, paddingRight: 16}}>
        <Item fixedLabel underline={false} bordered={false}>
          <Icon active name="rename-box" type="MaterialCommunityIcons" />
          <Label>First Name</Label>
          <Input defaultValue={user.firstName} maxLength={40} underlineColorAndroid="transparent" onChangeText={v => this.setState({user: {...this.state.user, firstName: v}})} />
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
        <Button full danger bordered style={{marginVertical: 20, marginLeft: 14}} onPress={() => this.onUpdateProfile()}>
          <Text>Update profile</Text>
        </Button>
      </Form>
    );
  }

  renderAvatar() {
    const {user} = this.state;
    return (
      <View style={styles.avatarSection}>
        <View style={{position: 'absolute', top: 0, left: 0, height: 80, width: '100%', backgroundColor: color.primary}} />
        <View style={{height: 160, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{flexDirection: 'row', flex: 1, height: 120, width: '100%', justifyContent: 'space-around', alignItems: 'center'}}>
            <Button rounded small iconLeft style={{backgroundColor: '#d60022', alignSelf: 'center'}} onPress={() => this.setState({showDialog: true})}>
              <Icon name="logout" type="SimpleLineIcons" style={{fontSize: 15}} />
              <Text style={{fontSize: 12}}>Logout</Text>
            </Button>
            <Thumbnail
              source={user.photoUrl && user.photoUrl.length > 0 ? {uri: user.photoUrl} : require('../../../assets/icons/default_avatar.png')}
              style={{width: 120, height: 120}}
            />
            <Button rounded small iconRight style={{backgroundColor: '#006acc', alignSelf: 'center'}} onPress={() => this.props.navigation.navigate('Contacts')}>
              <Text style={{fontSize: 12}}>Contacts</Text>
              <Icon name="contact-phone" type="MaterialIcons" style={{fontSize: 15}} />
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
      </View>
    );
  }

  render() {
    return (
      <AppScreenWrapper loading={this.state.loading}>
        <Content refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.handleRefresh()} colors={refreshControlColors} />}>
          {this.renderAvatar()}

          <View style={{backgroundColor: color.primary, paddingVertical: 4, paddingLeft: 10, marginTop: 10}}>
            <Text style={{color: color.white}}>Profile</Text>
          </View>
          {this.renderFormUpdateProfile()}

          <View style={{backgroundColor: color.primary, paddingVertical: 4, paddingLeft: 10, marginTop: 10}}>
            <Text style={{color: color.white}}>Privacy</Text>
          </View>
          <List style={{marginTop: 5, marginBottom: 15}}>
            <ListItem icon onPress={() => this.onShareQrCode()}>
              <Left>
                <Icon active name="qrcode" type="MaterialCommunityIcons" color={color.accent} />
              </Left>
              <Body>
                <Text>Share QR Code</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem icon onPress={() => this.setState({showChangePassword: true})}>
              <Left>
                <Icon active name="security" type="MaterialCommunityIcons" color={color.primaryLight} />
              </Left>
              <Body>
                <Text>Change Password</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
          {this.renderModalQrCode()}
          {this.renderModalChangePassword()}
          {this.renderModalLogout()}
        </Content>
      </AppScreenWrapper>
    );
  }

  onChangePassword = async () => {
    if (this.state.oldPassword === '' || this.state.newPassword === '') {
      return Alert.alert("Fields can't be empty");
    }
    if (this.state.newPassword !== this.state.confirmPass) {
      return Alert.alert('Confirm password is not match');
    }
    this.setState({loading: true});
    authApi
      .changePassword({oldPassword: this.state.oldPassword, newPassword: this.state.newPassword})
      .then(msg => {
        this.setState({loading: false});
        Alert.alert(msg);
        this.setState({oldPassword: '', newPassword: '', confirmPass: '', showChangePassword: false});
      })
      .catch(err => {
        this.setState({loading: false});
        console.log(err);
        handleError(err);
      });
  };

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
    height: 220,
    backgroundColor: '#fff',
  },
  qrcodeSection: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});
