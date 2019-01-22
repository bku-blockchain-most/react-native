/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {RefreshControl, Alert, Image, Modal, Linking, StyleSheet} from 'react-native';
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
      showQrCode: false,
      qrcodeContent: null,
      ticket: null,
      bookingTicket: false,
    };
  }

  componentWillMount() {
    // fetch event, villages, ticket
    this.countDownLoading = 3;
    this.setState({loading: true});
    this.fetchEvent();
    this.fetchVillages();
  }

  fetchEvent() {
    appApi
      .fetchEvents()
      .then(events => {
        this.setState({loading: --this.countDownLoading > 0, event: events[0] || {}});
        this.fetchTicket();
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

  fetchTicket() {
    appApi
      .fetchTicketOfEvent({eventID: this.state.event.id})
      .then(ticket => {
        this.setState({loading: --this.countDownLoading > 0, refreshing: false, ticket});
      })
      .catch(err => {
        this.setState({loading: --this.countDownLoading > 0, refreshing: false});
        handleError(err);
      });
  }

  handleRefresh() {
    this.setState({refreshing: true});
    this.fetchTicket();
  }

  handleOpenDescription() {
    this.setState({showDescription: true});
  }

  handleOpenTicket() {
    if (this.state.ticket) {
      this.setState({showQrCode: true});
      if (!this.state.qrcodeContent) {
        setTimeout(() => this.setState({qrcodeContent: this.retrieveQrCodeContent()}), 200);
      }
    } else {
      this.handleOpenDescription();
    }
  }

  handleBookTicket() {
    this.setState({bookingTicket: true});
    appApi
      .bookTicketOfEvent({eventID: this.state.event.id})
      .then(ticket => {
        this.setState({ticket, showQrCode: true, bookingTicket: false});
        setTimeout(() => this.setState({qrcodeContent: this.retrieveQrCodeContent()}), 200);
      })
      .catch(err => {
        handleError(err);
      });
  }

  confirmBookTicket() {
    Alert.alert('Confirmation', 'Do you want to book a ticket? A transaction will be created on Ethereum.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'YES',
        onPress: async () => {
          this.handleBookTicket();
        },
      },
    ]);
  }

  retrieveQrCodeContent() {
    const {tid, txHash} = this.state.ticket || {};
    return JSON.stringify({tid, txHash});
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
      <Modal visible={this.state.showDescription} animationType="slide" onRequestClose={() => this.setState({showDescription: false})}>
        <Button transparent onPress={() => this.setState({showDescription: false})} style={{position: 'absolute', top: 4, left: 8}}>
          <Icon name="ios-arrow-back" />
        </Button>
        <Content style={{paddingTop: 10, paddingHorizontal: 20, marginTop: 40}}>
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
          <View style={{marginTop: 20, marginBottom: 30}}>
            {this.state.bookingTicket ? (
              <Spinner color={color.primary} />
            ) : this.state.ticket ? (
              <Button full danger onPress={() => this.setState({showQrCode: true})}>
                <Text>View your ticket</Text>
              </Button>
            ) : (
              <Button full danger onPress={() => this.confirmBookTicket()}>
                <Text>Book a Ticket</Text>
              </Button>
            )}
          </View>
        </Content>
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
      <Modal visible={this.state.showQrCode} animationType="slide" onRequestClose={() => this.setState({showQrCode: false})}>
        <Content style={{padding: 15}} contentContainerStyle={{alignItems: 'center'}}>
          <H2 style={{marginTop: 20}}>Your Ticket</H2>
          <Text style={{marginTop: 20, alignSelf: 'flex-start'}}>
            <Text style={{fontWeight: '700'}}>Ticket Code: </Text> {this.state.ticket.tid}
          </Text>
          <Text style={{marginTop: 10, alignSelf: 'flex-start'}}>
            <Text style={{fontWeight: '700'}}>Transaction Hash: </Text>
            <Text style={{color: 'blue'}} onPress={() => Linking.openURL(UrlUtils.getEtherscanTransactionURL(this.state.ticket.txHash))}>
              {this.state.ticket.txHash}
            </Text>
          </Text>
          <Text style={{marginTop: 10, alignSelf: 'flex-start'}}>
            <Text style={{fontWeight: '700'}}>Created At: </Text>
            {moment(this.state.ticket.created_date).format('MMMM Do YYYY, h:mm:ss a')}
          </Text>
          <View style={{...customStyles.qrcodeSection, marginBottom: 30}}>
            {this.state.qrcodeContent ? (
              <QRCode value={this.state.qrcodeContent} size={qrcodeSize} fgColor="white" />
            ) : (
              <View style={{height: qrcodeSize, width: qrcodeSize, justifyContent: 'center', alignItems: 'center', flex: 1}}>
                <Spinner color="red" />
              </View>
            )}
            <Text style={{fontSize: 15, marginVertical: 10}}>Scan QR code to view ticket</Text>
            <View style={{flexDirection: 'row', flex: 1, width: qrcodeSize, justifyContent: 'space-around', marginTop: 20}}>
              <Button dark full onPress={() => this.setState({showQrCode: false})} style={{flex: 1}}>
                <Text>Close</Text>
              </Button>
            </View>
          </View>
        </Content>
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
