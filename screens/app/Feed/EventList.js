/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ScrollView, View, Image} from 'react-native';
import axios from 'axios';
// import EventDetail from '../../../components/common/EventDetail';
import EventDetail from '../../../components/EventDetail';
import urlJoin from 'url-join';
import config from '../../../config';
import {getUserProfile} from '../../../utils';
import FeedScreenWrapper from './_wrapper';
import {OpenSansBoldText} from '../../../components/common/StyledText';
import {styles} from '../../../styles';

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

    console.log('EventList: events', events);
    console.log('EventList: user', user);

    return (
      <FeedScreenWrapper>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <OpenSansBoldText style={{fontSize: 16, ...styles.textPrimary, padding: 5}}>{this.state.user.email}</OpenSansBoldText>
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
