/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Image, StatusBar, Text, Platform, Dimensions, StyleSheet} from 'react-native';
import {Icon, Button, Container, Content} from 'native-base';

import {styles, color} from '../../styles';
import Loading from '../../components/Loading';

class AuthScreenWrapper extends Component {
  /**
   * props:
   * title: !string
   * showButtonBack: ?boolean
   * navigation: ?
   * loading: !boolean
   */
  render() {
    return (
      <Container style={{backgroundColor: '#d1d1d1'}}>
        <Content contentContainerStyle={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {Platform.select({
            android: <StatusBar backgroundColor={color.primaryDark} barStyle="light-content" />,
            ios: <StatusBar backgroundColor={color.primary} barStyle="dark-content" />,
          })}

          {this.props.showButtonBack && (
            <Button transparent style={{position: 'absolute', left: 10, top: 8}} onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-back" style={{color: color.primary, fontSize: 30}} />
            </Button>
          )}

          <Loading visible={this.props.loading} />

          <Image
            source={require('../../assets/icons/brand.png')}
            style={{
              width: Dimensions.get('window').width * 0.8,
            }}
            resizeMode="contain"
          />

          {this.props.title && (
            <Text
              style={{
                ...styles.fontOpenSans,
                textTransform: 'uppercase',
                fontWeight: 'bold',
                fontSize: 28,
                color: color.white,
                marginBottom: 20,
                marginTop: 5,
              }}>
              {this.props.title}
            </Text>
          )}

          {this.props.children}
        </Content>
      </Container>
    );
  }
}

export default AuthScreenWrapper;

export const customStyles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    marginVertical: 4,
  },
});
