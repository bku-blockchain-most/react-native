
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Button, Text, Icon, Content, Header, Left, Right, Body, Title } from 'native-base';

import AppScreenWrapper from '../_wrapper';
import { color } from '../../../styles';

class QrScannerScannerContacts extends Component {
  static navigationOptions = {
    tabBarLabel: 'Scanner',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name="qrcode-scan"
        type="MaterialCommunityIcons"
        style={{ color: tintColor }}
      />
    ),
  };

  constructor(props) {
    super(props);

    this.state = { loading: false };
  }


  onButtonPress = () => {
    this.props.navigation.navigate('CreatingContact');
  }

  onSuccess(e) {
    const partnerJSONString = e.data;
    this.props.navigation.navigate('ProfileContact', {partnerJSONString});
  }

  render() {
    return (
      <AppScreenWrapper loading={this.state.loading}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Scan Contact</Title>
          </Body>
          <Right>
            <Button transparent
              // onPress={() => this.props.navigation.navigate('CreatingContact')}
            >
              <Icon name="add" type="MaterialIcons" color={color.white} />
            </Button>
          </Right>
        </Header>
        <Content>
          <QRCodeScanner
            onRead={this.onSuccess.bind(this)}
            topContent={
              <Text style={styles.centerText}>
                Scan QRCode to add new contact ...
            </Text>
            }
            bottomContent={
              <View style={styles.buttonview}>
                <Button bordered danger
                  // onPress={() => this.onButtonPress()}
                >
                  <Text>    Search Contacts    </Text>
                </Button>
              </View>
            }
          />
        </Content>
      </AppScreenWrapper>
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flexDirection: 'row',
    fontSize: 16,
    padding: 20,
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
    marginTop: 10
  },
});

export default QrScannerScannerContacts;
