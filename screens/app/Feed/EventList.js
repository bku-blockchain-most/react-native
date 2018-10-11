import React, { Component } from 'react';
import { ScrollView, Text, View ,Image} from 'react-native';
import axios from 'axios';
import EventDetail from '../../../components/common/EventDetail';

class EventList extends Component {

    static navigationOptions = {
        title: 'Event',
        headerBackTitle: null,
        tabBarLabel: 'Event',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../../components/image/event5.png')}
                style={[{height:40,width:40},{tintColor}]}
            />
        )
    };

    state = { events: [] };
    componentWillMount() {
        axios.get('http://blockchain-ticket.herokuapp.com/events')
            .then(response => this.setState({ events: response.data }));
    }
    renderEvents(props,navi) {
        return this.state.events.map(event =>
            <EventDetail key={event.event_name} eventX={event} text1={props} naviga={navi}/>);
    }
    render() {
        const { navigate } = this.props.navigation;
        let {params} = this.props.navigation.state;
        // const setParamsAction = NavigationActions.setParams({
        //     params: { title: 'Hello' },
        //     key: 'screen-123',
        //   });
        params = params || {};
        return (
            <View style={{ flex: 1 ,backgroundColor:'white'}}>
                <Text>{this.props.text}</Text>
                <Text>{params.text}</Text>
                <ScrollView>
                    {this.renderEvents(params.text,navigate)}
                </ScrollView>
            </View>
        );
    }
}

export default EventList;
