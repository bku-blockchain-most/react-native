/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ScrollView, Text, View, Image} from 'react-native';
import axios from 'axios';
// import EventDetail from '../../../components/common/EventDetail';
import EventDetail from '../../../components/EventDetail';
import urlJoin from 'url-join';
import config from '../../../config';
import {getUserProfile} from '../../../utils';

class EventList extends Component {
  static navigationOptions = {
    title: 'Event',
    headerBackTitle: null,
    tabBarLabel: 'Event',
    tabBarIcon: ({tintColor}) => <Image source={require('../../../assets/images/event5.png')} style={[{height: 40, width: 40}, {tintColor}]} />,
  };

  state = {events: [], user: {}};

  componentWillMount() {
    axios.get(urlJoin(config.apiBlockchainTicket, 'events')).then(response => this.setState({events: response.data}));
    getUserProfile().then(user => this.setState({user}));
  }

  render() {
    const {navigate} = this.props.navigation;
    const {events, user} = this.state;

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Text>{this.state.user.email}</Text>
        <ScrollView style={{paddingHorizontal: 5}}>
          {events.map(event => (
            <EventDetail key={event.event_name} event={event} text={user.email} navigate={navigate} />
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default EventList;
