/**
 * @format
 * @flow
 */

import React from 'react';
import {ScrollView, StyleSheet, View, TextInput, Dimensions} from 'react-native';

import {Avatar, Icon as IconEle} from 'react-native-elements';
import QRCode from 'react-native-qrcode';
import {Button, Tab, Tabs, Icon, Text} from 'native-base';
import FeedScreenWrapper from './_wrapper';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => <Icon name="account-location" type="MaterialCommunityIcons" style={{color: tintColor}} />,
  };

  constructor(props) {
    super(props);
    this.state = {
      first_name: 'Harry',
      last_name: 'Potter',
      phone: '0123456789',
      email: 'abc_cse@hcmut.edu.vn',
      company: 'IBL',
      position: 'Intership',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    };
  }

  render() {
    return (
      <FeedScreenWrapper>
        <ScrollView automaticallyAdjustContentInsets={true} style={styles.container}>
          <View style={styles.avatarSection}>
            <Avatar source={{uri: this.state.avatar}} xlarge rounded />
            <View style={{margin: 20}}>
              <IconEle size={40} name="camera" type="feather" onPress={() => {}} />
            </View>
          </View>

          <Tabs>
            <Tab heading="INFO">
              <View style={styles.infoSection}>
                <View style={styles.infoContent}>
                  <Text style={{...styles.label}}> First Name </Text>
                  <TextInput
                    style={styles.text}
                    defaultValue={this.state.first_name}
                    editable={true}
                    maxLength={40}
                    underlineColorAndroid="transparent"
                  />
                </View>
                <View style={styles.line} />
                <View style={styles.infoContent}>
                  <Text style={styles.label}> Last Name </Text>
                  <TextInput style={styles.text} defaultValue="Potter" editable={true} maxLength={40} underlineColorAndroid="transparent" />
                </View>
                <View style={styles.line} />
                <View style={styles.infoContent}>
                  <Text style={styles.label}> Email </Text>
                  <TextInput
                    style={styles.text}
                    defaultValue="abc_cse@hcmut.edu.vn"
                    editable={true}
                    maxLength={40}
                    underlineColorAndroid="transparent"
                  />
                </View>
                <View style={styles.line} />
                <View style={styles.infoContent}>
                  <Text style={styles.label}> Phone </Text>
                  <TextInput style={styles.text} defaultValue="0123456789" editable={true} maxLength={45} underlineColorAndroid="transparent" />
                </View>
                <View style={styles.line} />
                <View style={styles.infoContent}>
                  <Text style={styles.label}> Company </Text>
                  <TextInput style={styles.text} defaultValue="IBL" editable={true} maxLength={40} underlineColorAndroid="transparent" />
                </View>
                <View style={styles.line} />
                <View style={styles.infoContent}>
                  <Text style={styles.label}> Position </Text>
                  <TextInput style={styles.text} defaultValue="Intership" editable={true} maxLength={40} underlineColorAndroid="transparent" />
                </View>

                <View style={styles.passChangeSection}>
                  <View style={{marginTop: 30, marginBottom: 20}}>
                    <Text style={styles.passChangeHeader}>CHANGE PASSWORD</Text>
                  </View>

                  <View style={styles.infoContent}>
                    <Text style={styles.label}> Old Password </Text>
                    <TextInput
                      style={styles.text}
                      defaultValue="Intership"
                      editable={true}
                      maxLength={40}
                      underlineColorAndroid="transparent"
                      secureTextEntry
                    />
                  </View>
                  <View style={styles.line} />
                  <View style={styles.infoContent}>
                    <Text style={styles.label}> New Password </Text>
                    <TextInput
                      style={{...styles.text, width: '20%'}}
                      editable={true}
                      maxLength={40}
                      underlineColorAndroid="transparent"
                      secureTextEntry
                    />
                  </View>
                  <View style={styles.line} />
                  <View style={styles.infoContent}>
                    <Text style={styles.label}> Confirm Password </Text>
                    <TextInput
                      style={{...styles.text, width: '20%'}}
                      editable={true}
                      maxLength={40}
                      underlineColorAndroid="transparent"
                      secureTextEntry
                    />
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
                  value={JSON.stringify({
                    last_name: this.state.last_name,
                    first_name: this.state.first_name,
                    phone: this.state.phone,
                    email: this.state.email,
                    company: this.state.company,
                    position: this.state.position,
                  })}
                  size={Dimensions.get('screen').width * 0.88}
                  fgColor="white"
                />
                <Text style={{color: 'royalblue', fontSize: 19, fontStyle: 'italic', marginTop: 10}}> Scan this QR code to add contact</Text>
              </View>
            </Tab>
          </Tabs>
        </ScrollView>
      </FeedScreenWrapper>
    );
  }
}

const styles = StyleSheet.create({
  avatarSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 280,
    backgroundColor: '#fff',
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
