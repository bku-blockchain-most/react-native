/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {Icon} from 'native-base';
import axios from 'axios';
// import EventDetail from '../../../components/common/EventDetail';
import EventDetail from '../../../components/EventDetail';
import urlJoin from 'url-join';
import config from '../../../config';
import {getUserProfile} from '../../../utils';
import FeedScreenWrapper from './_wrapper';
import {OpenSansText} from '../../../components/common/StyledText';
import {styles} from '../../../styles';

class EventList extends Component {
  static navigationOptions = {
    title: 'Event',
    headerBackTitle: null,
    tabBarLabel: 'Event',
    tabBarIcon: ({tintColor}) => <Icon name="event-available" type="MaterialIcons" style={{color: tintColor}} />,
  };

  state = {events: [], user: {}};

  componentWillMount() {
    axios.get(urlJoin(config.apiBlockchainTicket, 'events')).then(response => this.setState({events: response.data}));
    getUserProfile().then(user => this.setState({user}));
  }

  render() {
    const {navigate} = this.props.navigation;
    const {events, user} = this.state;

    console.log('EventList: events', events);
    console.log('EventList: user', user);

    return (
      <FeedScreenWrapper>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <OpenSansText style={{fontSize: 16, ...styles.textPrimary, padding: 5}}>{this.state.user.email}</OpenSansText>
          <ScrollView>
            {events.map(event => (
              <EventDetail key={event.event_name} event={event} text={user.email} navigate={navigate} />
            ))}
          </ScrollView>
        </View>
      </FeedScreenWrapper>
    );
  }
}

export default EventList;
