/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, Icon, List, ListItem, Left, Body, Right, Content, Button, Container, Header, Item, Input, Card, CardItem} from 'native-base';

import _ from 'lodash';

import {FlatList} from 'react-native';

// form of logs
const data = [
  {
    time: '23/09/2018',
    note: 'Gap trao doi ve blockchain o an giang',
  },
  {
    time: '2/10/2018',
    note: 'Gap tai seminar Blockchain tai BKU',
  },
];

class Log extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => <Icon name="contacts" type="MaterialIcons" style={{color: tintColor}} />,
  };

  constructor(props) {
    super(props);

    this.state = {
      data: {
        original: [],
        filter: [],
      },
    };
  }

  componentWillMount() {
    this.getData();
  }

  getData = () => {
    // TODO
    // get data logs of user from database, form of data is above
    // var data = ...
    this.setState({
      data: {
        original: data,
        filter: data,
      },
    });
  };

  onSearchInputChanged = event => {
    const pattern = new RegExp(event.nativeEvent.text, 'i');
    const logs = _.filter(this.state.data.original, log => {
      const filterResult = {
        time: log.time.search(pattern),
        note: log.note.search(pattern),
      };
      return filterResult.note !== -1 || filterResult.time !== -1 ? log : undefined;
    });
    this.setState({
      data: {
        original: this.state.data.original,
        filter: logs,
      },
    });
  };

  renderItem = ({item}) => (
    <ListItem>
      <Card>
        <CardItem header bordered>
          <Text>{item.time}</Text>
        </CardItem>
        <CardItem bordered>
          <Text>{item.note}</Text>
        </CardItem>
      </Card>
    </ListItem>
  );

  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" onChange={this.onSearchInputChanged} />
          </Item>
        </Header>
        <Content>
          <FlatList data={this.state.data.filter} renderItem={this.renderItem} enableEmptySections />
        </Content>
      </Container>
    );
  }
}

export default Log;
