
import React, {Component} from 'react';
import {StyleSheet, View, Alert, Image} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Button, Text } from 'native-base';
import axios from 'axios';

class QrScannerScannerContacts extends Component {
  static navigationOptions = {
    tabBarLabel: 'Scanner',
    tabBarIcon: ({tintColor}) => (
      <Icon
        name="qrcode-scan"
        type="MaterialCommunityIcons"
        style={{color: tintColor}}
      />
    ),
  };
  
  constructor(props){
    super(props);
  }
 

  onButtonPress = () => {
    this.props.navigation.navigate('CreatingContact')
  }

  onSuccess(e) {
      var info = JSON.parse(e.data);

      this.props.navigation.navigate('CreatingContact',{
        uidUser: info.uid,
        name: info.name,
        phone:info.phone,
        email: info.email,
        major: info.major,
        company: info.company,
        time: new Date().toLocaleString(),
    })
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <QRCodeScanner
          onRead={this.onSuccess.bind(this)}
          topContent={
            <Text style={styles.centerText}>
              Scan QRCode to add new contact ...
            </Text>
          }
          bottomContent={
            <View style={styles.buttonview}>
               <Button bordered success onPress = {() => this.onButtonPress()}>
                  <Text>          Skip         </Text>
                </Button>
            </View>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flexDirection: 'row',
    fontSize: 16,
    padding: 25,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonview: {
    borderWidth: 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginHorizontal: 50,
  },
});

export default QrScannerScannerContacts;
