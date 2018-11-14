/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {Icon} from 'native-base';
import axios from 'axios';
import EventDetail from '../../../components/common/EventDetail';
import FeedScreenWrapper from './_wrapper';
import {RAMUtils} from '../../../utils';

class EventList extends Component {
  static navigationOptions = {
    title: 'Event',
    headerBackTitle: null,
    tabBarLabel: 'Event',
    tabBarIcon: ({tintColor}) => <Icon name="event-available" type="MaterialIcons" style={{color: tintColor}} />,
  };

  state = {
    events: [],
    loading: false,
  };

  componentWillMount() {
    this.setState({loading: true});
    // axios.get(urlJoin(config.apiBlockchainTicket, 'events')).then(response => this.setState({loading: false, events: response.data}));
    this.setState({
      uid:RAMUtils.getId()
    });
    axios.get('http://blockchain-ticket.herokuapp.com/events').then(response => this.setState({loading:false, events: response.data }));
  }

  render() {
    const {navigate} = this.props.navigation;
    const {events} = this.state;

    const user = RAMUtils.getUser();

    console.log('EventList: events', events);
    console.log('EventList: user', user);

    return (
      <FeedScreenWrapper loading={this.state.loading}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <ScrollView>
            {events.map(event => (
              <EventDetail key={event.event_name} eventX={event} text1={user.username} naviga={navigate} />
            ))}
          </ScrollView>
        </View>
      </FeedScreenWrapper>
    );
  }
}

export default EventList;
