/**
 * @format
 * @flow
 */

import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import FeedScreenWrapper from './_wrapper';

import {Button, Icon, Text, Thumbnail, Toast, Form, Textarea} from 'native-base';
import {appApi} from '../../../api';
import {handleError} from '../../../utils';
var base64 = require('base-64');

export default class ProfileContactScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => <Icon name="account-location" type="MaterialCommunityIcons" style={{color: tintColor}} />,
    title: 'Profile',
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      note: '',
    };

    const partnerJSONString = this.props.navigation.getParam('partnerJSONString');
    // console.log(partnerJSONString);
    let partner = this.formUserProfile();
    if (partnerJSONString) {
      partner = JSON.parse(base64.decode(partnerJSONString)) || this.formUserProfile();
    }
    // console.log(partner);

    this.partner = partner;
  }

  formUserProfile = () => ({
    id: '',
    fullname: '',
    photoUrl: '',
  });

  onTrackPressed = () => {
    this.setState({loading: true});
    appApi
      .addContact(this.partner.id)
      .then(() => {
        appApi
          .addRecord(this.partner.id, this.state.note)
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
          </View>
          <View style={styles.infoSection}>
            <View style={styles.infoContent}>
              <Text style={styles.text}>{user.fullname}</Text>
            </View>
            <Form>
              <Textarea rowSpan={5} bordered placeholder="Note" value={this.state.note} onChangeText={note => this.setState({note: note})} />
            </Form>
            <View style={styles.saveButton}>
              <Button rounded danger style={{paddingHorizontal: 20}} onPress={() => this.onTrackPressed()}>
                <Text>Track</Text>
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
    height: 150,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  infoSection: {
    flex: 1,
    marginTop: 5,
  },
  line: {
    backgroundColor: 'gainsboro',
    height: 1,
    marginTop: 8,
    marginBottom: 8,
  },
  infoContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: 25,
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
