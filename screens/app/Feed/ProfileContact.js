/**
 * @format
 * @flow
 */

import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import FeedScreenWrapper from './_wrapper';

import {Button, Icon, Text, Thumbnail, Toast} from 'native-base';
import {color} from '../../../styles';
import {appApi} from '../../../api';
import {handleError} from '../../../utils';

export default class ProfileContactScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => <Icon name="account-location" type="MaterialCommunityIcons" style={{color: tintColor}} />,
    title: 'Profile',
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };

    const partnerJSONString = this.props.navigation.getParam('partnerJSONString');
    let partner = this.formUserProfile();
    if (partnerJSONString) {
      partner = JSON.parse(partnerJSONString) || this.formUserProfile();
    }

    this.partner = partner;
  }

  formUserProfile = () => ({
    id: '',
    fullname: '',
    // username: '',
    // email: '',
    // tel: '',
    // displayName: {
    //   firstName: '',
    //   lastName: '',
    // },
    // company: '',
    // position: '',
  });

  onAddContact = () => {
    this.setState({loading: true});
    appApi
      .addContact(this.partner.id)
      .then(() => {
        this.setState({loading: false});
        Toast.show({
          text: 'Successfully',
          buttonText: 'Ok',
          buttonTextStyle: {color: '#008000'},
          buttonStyle: {backgroundColor: '#5cb85c'},
        });
        this.props.navigation.navigate('Contact');
      })
      .catch(err => {
        this.setState({loading: false});
        handleError(err);
      });
  };

  render() {
    const user = this.partner;

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

          <View style={styles.infoSection}>
            <View style={styles.infoContent}>
              <Text style={{...styles.label}}> Full Name </Text>
              <Text style={styles.text} defaultValue={user.fullname} maxLength={40} underlineColorAndroid="transparent" />
            </View>
            {/* <View style={styles.line} />
            <View style={styles.infoContent}>
              <Text style={styles.label}> Email </Text>
              <Text style={styles.text} defaultValue={user.email} maxLength={40} underlineColorAndroid="transparent" />
            </View>
            <View style={styles.line} />
            <View style={styles.infoContent}>
              <Text style={styles.label}> Tel </Text>
              <Text style={styles.text} defaultValue={user.tel} maxLength={45} underlineColorAndroid="transparent" />
            </View>
            <View style={styles.line} />
            <View style={styles.infoContent}>
              <Text style={styles.label}> Company </Text>
              <Text style={styles.text} defaultValue={user.company} maxLength={40} underlineColorAndroid="transparent" />
            </View>
            <View style={styles.line} />
            <View style={styles.infoContent}>
              <Text style={styles.label}> Position </Text>
              <Text style={styles.text} defaultValue={user.position} maxLength={40} underlineColorAndroid="transparent" />
            </View> */}

            <View style={styles.saveButton}>
              <Button rounded danger style={{paddingHorizontal: 20}} onPress={() => this.onAddContact()}>
                <Text>Connect</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </FeedScreenWrapper>
    );
  }
}

const styles = StyleSheet.create({
  avatarSection: {
    flex: 1,
    flexDirection: 'column',
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
