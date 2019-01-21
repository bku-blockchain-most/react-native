/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {RefreshControl, Image, Modal, Linking, StyleSheet} from 'react-native';
import {Icon, Content, ListItem, Body, Text, Button, View, Thumbnail, Card, H2, List, Spinner} from 'native-base';
import moment from 'moment';
import QRCode from 'react-native-qrcode';

import AppScreenWrapper from '../_wrapper';

import {handleError, UrlUtils} from '../../../utils';
import {refreshControlColors, dynamicStyles, color} from '../../../styles';
import {appApi} from '../../../api';

class EventList extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => <Icon name="event-available" type="MaterialIcons" style={{color: tintColor}} />,
  };

  constructor(props) {
    super(props);

    this.state = {
      event: null, // now we only support one event
      villages: [], // villages in this event
      loading: false,
      refreshing: false,
      showDescription: false,
      hadTicket: null,
      showQrCode: false,
      qrcodeContent: null,
    };
  }

  componentWillMount() {
    this.countDownLoading = 2;
    this.setState({loading: true});
    this.fetchEvent();
    this.fetchVillages();
  }

  fetchEvent() {
    appApi
      .fetchEvents()
      .then(events => {
        this.setState({loading: --this.countDownLoading > 0, event: events[0] || {}});
      })
      .catch(err => {
        this.setState({loading: --this.countDownLoading > 0});
        handleError(err);
      });
  }

  fetchVillages() {
    appApi
      .fetchVillages()
      .then(villages => {
        this.setState({loading: --this.countDownLoading > 0, refreshing: false, villages});
      })
      .catch(err => {
        this.setState({loading: --this.countDownLoading > 0, refreshing: false});
        handleError(err);
      });
  }

  handleRefresh() {}

  fetchTicket() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 400);
    });
  }

  bookTicket() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({ticketID: 'uty38rnc23'}), 400);
    });
  }

  handleOpenDescription() {
    this.setState({showDescription: true});
    if (this.state.hadTicket == null) {
      this.fetchTicket()
        .then(() => this.setState({hadTicket: false}))
        .catch(err => handleError(err));
    }
  }

  handleOpenTicket() {
    if (this.state.hadTicket && this.state.qrcodeContent) {
      this.setState({showQrCode: true});
    } else {
      this.handleOpenDescription();
    }
  }

  handleBookTicket() {
    this.setState({hadTicket: null});
    this.bookTicket()
      .then(ticketID => {
        this.setState({hadTicket: true, showQrCode: true});
        setTimeout(() => this.setState({qrcodeContent: ticketID}), 300);
      })
      .catch(err => {
        handleError(err);
      });
  }

  renderEvent() {
    const {event_name, organizer, title, starting_date, photo_url} = this.state.event;
    return (
      <View style={{flex: 1}}>
        <Image source={{uri: this.state.event.photo_url}} style={{width: null, flex: 1, height: 100, resizeMode: 'cover'}} />
        <View style={{padding: 15}}>
          <View style={{flexDirection: 'row', marginTop: 4}}>
            <Thumbnail source={{uri: photo_url}} style={{flex: 0}} />
            <View style={{flex: 1, marginLeft: 10}}>
              <Text style={{fontWeight: '700', color: color.primary}}>{event_name || 'Title Polling'}</Text>
              <Text note>
                {moment(starting_date).calendar()} - {organizer || ''}
              </Text>
            </View>
            <Icon name="credit-card-scan" type="MaterialCommunityIcons" style={{...customStyles.iconButtonCircle, flex: 0}} onPress={() => this.handleOpenTicket()} />
          </View>
          <View style={{flexDirection: 'row', marginTop: 10, justifyContent: 'space-between'}}>
            <Text style={{fontWeight: '700', flex: 1}}>{title || ''}</Text>
            <Icon name="ellipsis-h" type="FontAwesome" style={{...customStyles.iconButtonCircle, flex: 0}} onPress={() => this.handleOpenDescription()} />
          </View>
        </View>
      </View>
    );
  }

  renderModalEventDetail() {
    const {event_name, organizer, title, description, starting_date, photo_url} = this.state.event;
    return (
      <Modal visible={this.state.showDescription} animationType="slide">
        <Button transparent onPress={() => this.setState({showDescription: false})} style={{position: 'absolute', top: 4, left: 8}}>
          <Icon name="ios-arrow-back" />
        </Button>
        <View style={{padding: 20, marginTop: 28}}>
          <View style={{flexDirection: 'row', marginTop: 4}}>
            <Thumbnail source={{uri: photo_url}} style={{flex: 0}} />
            <View style={{flex: 1, marginLeft: 10}}>
              <Text style={{fontWeight: '700', color: color.primary}}>{event_name || 'Title Polling'}</Text>
              <Text note>
                {moment(starting_date).calendar()} - {organizer || ''}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={{fontWeight: '700', flex: 1}}>{title || ''}</Text>
          </View>
          <View style={{marginTop: 10}}>
            <Text>{description}</Text>
          </View>
          <View style={{marginTop: 20}}>
            {this.state.hadTicket == null ? ( // loading
              <Spinner color={color.primary} />
            ) : this.state.hadTicket ? (
              <Button full danger onPress={() => this.setState({showQrCode: true})}>
                <Text>View your ticket</Text>
              </Button>
            ) : (
              <Button full danger onPress={() => this.handleBookTicket()}>
                <Text>Book a Ticket</Text>
              </Button>
            )}
          </View>
        </View>
      </Modal>
    );
  }

  renderVillage(village) {
    return (
      <Card style={{flex: 1, ...dynamicStyles.changePadding(4), ...dynamicStyles.changeMargin(0)}}>
        <View style={{flexDirection: 'row', padding: 4}}>
          <Thumbnail small source={{uri: village.photo_url}} style={{flex: 0}} />
          <View style={{flex: 1, marginLeft: 8}}>
            <Text style={{fontWeight: '700', color: color.primary}}>{village.village_name || 'Village Name'}</Text>
            <Text note>{village.location || 'Location'}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', padding: 4}}>
          <Text>{village.village_head || 'Head of Village'}</Text>
        </View>
      </Card>
    );
  }

  renderModalQrCode() {
    const qrcodeSize = 256;
    return (
      <Modal visible={this.state.showQrCode} animationType="slide">
        <View style={{padding: 20, alignItems: 'center', flex: 1}}>
          <H2 style={{marginTop: 15}}>Your Ticket</H2>
          <Text style={{marginTop: 30, alignSelf: 'flex-start'}}>
            <Text style={{fontWeight: '700'}}>Ticket Code: </Text>
            84yt0bv9nq3urn902u30r34
          </Text>
          <Text style={{marginTop: 10, alignSelf: 'flex-start'}}>
            <Text style={{fontWeight: '700'}}>Transaction Hash: </Text>
            <Text style={{color: 'blue'}} onPress={() => Linking.openURL(UrlUtils.getEtherscanTransactionURL('hw84yt024ut9034n0ru2039urn203402934u03q342v34r34'))}>
              hw84yt024ut9034n0ru2039urn203402934u03q342v34r34
            </Text>
          </Text>
          <View style={customStyles.qrcodeSection}>
            {this.state.qrcodeContent ? (
              <QRCode value={this.state.qrcodeContent} size={qrcodeSize} fgColor="white" />
            ) : (
              <View style={{height: qrcodeSize, width: qrcodeSize, justifyContent: 'center', alignItems: 'center', flex: 1}}>
                <Spinner color="red" />
              </View>
            )}
            <Text style={{fontSize: 15, marginVertical: 20}}>Scan QR code to view ticket</Text>
            <View style={{flexDirection: 'row', flex: 1, width: qrcodeSize, justifyContent: 'space-around', marginTop: 20}}>
              <Button dark full onPress={() => this.setState({showQrCode: false})} style={{flex: 1}}>
                <Text>Close</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    return (
      <AppScreenWrapper loading={this.state.loading}>
        <Content scrollEnabled={false} contentContainerStyle={{flex: 1}}>
          {/* Event */}
          {this.state.event && this.renderEvent()}
          {this.state.event && this.renderModalEventDetail()}
          {this.state.qrcodeContent && this.renderModalQrCode()}
          {/* Villages */}
          <List
            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.handleRefresh()} colors={refreshControlColors} />}
            dataArray={this.state.villages}
            renderRow={o => (
              <ListItem
                onPress={() => this.props.navigation.navigate('VillageDetail', {village: o})}
                noBorder
                noIndent
                style={{...dynamicStyles.changeMargin(2), ...dynamicStyles.changePadding(2)}}>
                <Body style={{...dynamicStyles.changePadding(2), ...dynamicStyles.changeMargin(2)}}>{this.renderVillage(o)}</Body>
              </ListItem>
            )}
            enableEmptySections
            style={{...dynamicStyles.changePadding(2), ...dynamicStyles.changeMargin(2), flex: 1}}
          />
        </Content>
      </AppScreenWrapper>
    );
  }
}

export default EventList;

const customStyles = StyleSheet.create({
  iconButtonCircle: {
    width: 28,
    height: 28,
    backgroundColor: color.white,
    color: color.primary,
    borderColor: color.primary,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '900',
  },
  qrcodeSection: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});
