/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {RefreshControl, Image, Modal} from 'react-native';
import {Icon, Content, ListItem, Body, Text, Button, View, Thumbnail, Card, CardItem, Left, List} from 'native-base';
import moment from 'moment';

import AppScreenWrapper from '../_wrapper';

import {handleError} from '../../../utils';
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
          </View>
          <View style={{flexDirection: 'row', marginTop: 10, justifyContent: 'space-between'}}>
            <Text style={{fontWeight: '700', flex: 1}}>{title || ''}</Text>
            <Icon
              name="ios-more"
              style={{flex: 0, width: 32, height: 32, borderRadius: 16, backgroundColor: color.primary, color: color.white, textAlign: 'center', justifyContent: 'center'}}
              onPress={() => this.setState({showDescription: true})}
            />
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
        </View>
      </Modal>
    );
  }

  renderVillage(village) {
    return (
      <Card style={{flex: 1, ...dynamicStyles.changePadding(4), ...dynamicStyles.changeMargin(0)}}>
        <CardItem style={{backgroundColor: 'white', ...dynamicStyles.changePadding(5)}}>
          <Left style={{justifyContent: 'flex-start', ...dynamicStyles.changePadding(0)}}>
            <Thumbnail source={{uri: village.photo_url}} style={{flex: 0}} />
            <Body>
              <Text style={{fontWeight: '700', color: color.primary}}>{village.village_name || 'Village Name'}</Text>
              <Text note>{village.location || 'Location'}</Text>
            </Body>
          </Left>
        </CardItem>
      </Card>
    );
  }

  render() {
    return (
      <AppScreenWrapper loading={this.state.loading}>
        <Content scrollEnabled={false} contentContainerStyle={{flex: 1}}>
          {/* Event */}
          {this.state.event && this.renderEvent()}
          {this.state.event && this.renderModalEventDetail()}
          {/* Villages */}
          <List
            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.handleRefresh()} colors={refreshControlColors} />}
            dataArray={this.state.villages}
            renderRow={o => (
              <ListItem onPress={() => {}} noBorder noIndent style={{...dynamicStyles.changeMargin(0)}}>
                <Body style={{...dynamicStyles.changePadding(0)}}>{this.renderVillage(o)}</Body>
              </ListItem>
            )}
            enableEmptySections
            style={{...dynamicStyles.changePadding(4), ...dynamicStyles.changeMargin(5), flex: 1}}
          />
        </Content>
      </AppScreenWrapper>
    );
  }
}

export default EventList;
