/**
 * @format
 * @flow
 */

import React from 'react';
import {ScrollView, StyleSheet, View, TextInput, Dimensions} from 'react-native';

import QRCode from 'react-native-qrcode';

import FeedScreenWrapper from './_wrapper';

import {Button, Tab, Tabs, Icon, Text, Thumbnail} from 'native-base';
import {RAMUtils} from '../../../utils';
import {authApi} from '../../../api';
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
    };
  }

  render() {
    const {user} = this.state;

    const avatar =
      user.photoUrl && user.photoUrl.length > 0
        ? user.photoUrl
        : 'https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1';

    return (
      <FeedScreenWrapper loading={this.state.loading}>
        <ScrollView automaticallyAdjustContentInsets={true} style={styles.container}>
          <View style={styles.avatarSection}>
            <Thumbnail source={{uri: avatar}} style={{width: 150, height: 150}} />
            <View style={{marginTop: 15, marginBottom: 10}}>
              <Icon name="camera" type="FontAwesome" style={{fontSize: 40, color: color.primary}} />
            </View>
          </View>

          <Tabs>
            <Tab heading="INFO">
              <View style={styles.infoSection}>
                <View style={styles.infoContent}>
                  <Text style={{...styles.label}}> First Name </Text>
                  <TextInput style={styles.text} defaultValue={user.firstName} editable={true} maxLength={40} underlineColorAndroid="transparent" />
                </View>
                <View style={styles.line} />
                <View style={styles.infoContent}>
                  <Text style={styles.label}> Last Name </Text>
                  <TextInput style={styles.text} defaultValue={user.lastName} editable={true} maxLength={40} underlineColorAndroid="transparent" />
                </View>
                <View style={styles.line} />
                <View style={styles.infoContent}>
                  <Text style={styles.label}> Email </Text>
                  <TextInput style={styles.text} defaultValue={user.email} editable={true} maxLength={40} underlineColorAndroid="transparent" />
                </View>
                <View style={styles.line} />
                <View style={styles.infoContent}>
                  <Text style={styles.label}> Tel </Text>
                  <TextInput style={styles.text} defaultValue={user.tel} editable={true} maxLength={45} underlineColorAndroid="transparent" />
                </View>
                <View style={styles.line} />
                <View style={styles.infoContent}>
                  <Text style={styles.label}> Company </Text>
                  <TextInput style={styles.text} defaultValue={user.company} editable={true} maxLength={40} underlineColorAndroid="transparent" />
                </View>
                <View style={styles.line} />
                <View style={styles.infoContent}>
                  <Text style={styles.label}> Position </Text>
                  <TextInput style={styles.text} defaultValue={user.position} editable={true} maxLength={40} underlineColorAndroid="transparent" />
                </View>

                <View style={styles.passChangeSection}>
                  <View style={{marginTop: 30, marginBottom: 20}}>
                    <Text style={styles.passChangeHeader}>CHANGE PASSWORD</Text>
                  </View>

                  <View style={styles.infoContent}>
                    <Text style={styles.label}> Old Password </Text>
                    <TextInput style={styles.text} defaultValue="" editable={true} maxLength={40} underlineColorAndroid="transparent" secureTextEntry />
                  </View>
                  <View style={styles.line} />
                  <View style={styles.infoContent}>
                    <Text style={styles.label}> New Password </Text>
                    <TextInput style={{...styles.text, width: '20%'}} editable={true} maxLength={40} underlineColorAndroid="transparent" secureTextEntry />
                  </View>
                  <View style={styles.line} />
                  <View style={styles.infoContent}>
                    <Text style={styles.label}> Confirm Password </Text>
                    <TextInput style={{...styles.text, width: '20%'}} editable={true} maxLength={40} underlineColorAndroid="transparent" secureTextEntry />
                  </View>
                </View>
                <View style={styles.saveButton}>
                  <Button rounded danger style={{paddingHorizontal: 20}}>
                    <Text>SAVE</Text>
                  </Button>
                </View>
              </View>
            </Tab>
            <Tab heading="QR CODE">
              <View style={styles.qrcodeSection}>
                <QRCode
                  value={base64.encode(JSON.stringify({
                    id: user.id,
                    fullname: user.firstName + user.lastName,
                    photoUrl: user.photoUrl,
                  }))}
                  size={Dimensions.get('screen').width * 0.88}
                  fgColor="white"
                />
                <Text style={{color: 'royalblue', fontSize: 19, fontStyle: 'italic', marginTop: 10}}> Scan this QR code to add contact</Text>
              </View>
            </Tab>
          </Tabs>

          <Button full rounded danger onPress={this._onClickSignOut}>
            <Text>Sign me out</Text>
          </Button>
        </ScrollView>
      </FeedScreenWrapper>
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
    height: 280,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  infoSection: {
    flex: 1,
    marginTop: 25,
  },
  line: {
    backgroundColor: 'gainsboro',
    height: 1,
    marginTop: 8,
    marginBottom: 8,
  },
  infoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
  },
  text: {
    fontWeight: '400',
    textAlign: 'right',
  },
  passChangeSection: {
    backgroundColor: 'transparent',
  },
  passChangeHeader: {
    color: 'crimson',
    marginLeft: 15,
    fontSize: 18,
  },
  saveButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 12,
  },
  qrcodeSection: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  label: {
    color: 'lightslategray',
    opacity: 0.85,
  },
});
