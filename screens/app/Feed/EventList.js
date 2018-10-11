/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ScrollView, Text, View, Image} from 'react-native';
import axios from 'axios';
import EventDetail from '../../../components/common/EventDetail';
import urlJoin from 'url-join';
import config from '../../../config';
import {getUserProfile} from '../../../utils';

class EventList extends Component {
  static navigationOptions = {
    title: 'Event',
    headerBackTitle: null,
    tabBarLabel: 'Event',
    tabBarIcon: ({tintColor}) => (
      <Image source={require('../../../assets/images/event5.png')} style={[{height: 40, width: 40}, {tintColor}]} />
    ),
  };

  state = {events: [], user: {}};

  componentWillMount() {
    axios.get(urlJoin(config.apiBlockchainTicket, 'events')).then(response => this.setState({events: response.data}));
    getUserProfile().then(user => this.setState({user}));
  }

  renderEvents(text, navigate) {
    return this.state.events.map(event => (
      <EventDetail key={event.event_name} event={event} text={text} navigate={navigate} />
    ));
  }

  render() {
    const {text} = this.props;
    const {navigate} = this.props.navigation;
    // let {params} = this.props.navigation.state;

    // const user = this.props.navigation.getParam('user', {});
    // console.log(user);
    // console.log(this.props.navigation);

    // params = params || {};

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Text>{text}</Text>
        {/* <Text>{params.text}</Text> */}
        <Text>{this.state.user.email}</Text>
        <ScrollView>{this.renderEvents(this.state.user.email, navigate)}</ScrollView>
      </View>
    );
  }
}

export default EventList;
