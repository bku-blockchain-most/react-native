/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Image, StatusBar, Text, Platform} from 'react-native';
import {Icon, Button} from 'native-base';

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
    const faviconSize = 100;
    return (
      <View style={{...styles.centerBox, backgroundColor: color.primaryDark}}>
        {Platform.select({
          android: <StatusBar backgroundColor={color.primaryDark} barStyle="light-content" />,
          ios: <StatusBar backgroundColor={color.primary} barStyle="dark-content" />,
        })}
        {this.props.showButtonBack && (
          <Button transparent style={{position: 'absolute', left: 8, top: 8}} onPress={() => this.props.navigation.goBack()}>
            <Icon name="ios-arrow-back" style={{color: 'white', fontSize: 26}} />
          </Button>
        )}
        <Loading visible={this.props.loading} />
        <Image
          source={require('../../assets/icons/logo_white.png')}
          style={{
            height: faviconSize,
            width: faviconSize,
          }}
          resizeMode="cover"
        />
        <View
          style={{
            width: '90%',
            marginTop: 20,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              ...styles.fontOpenSans,
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: 28,
              color: color.white,
              marginBottom: 20,
            }}>
            {this.props.title}
          </Text>

          {this.props.children}
        </View>
      </View>
    );
  }
}

export default AuthScreenWrapper;
