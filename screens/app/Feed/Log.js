/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, Icon, Content, Header, List, Button, Item, Input, Card, CardItem, Body, Left} from 'native-base';

import moment from 'moment';

import AppScreenWrapper from '../_wrapper';
import {appApi} from '../../../api';
import {handleError} from '../../../utils';
import {color} from '../../../styles';

class Log extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => <Icon name="contacts" type="MaterialIcons" style={{color: tintColor}} />,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      original: [], // { time, note, partner: { ... } }
      filter: [],
    };
  }

  componentWillMount() {
    this.fetchContacts();
  }

  fetchContacts = () => {
    this.setState({loading: true});
    appApi
      .fetchRecords()
      .then(records => {
        this.setState({
          loading: false,
          original: records,
          filter: records,
        });
      })
      .catch(err => {
        this.setState({loading: false});
        handleError(err);
      });
  };

  onSearchInputChanged = text => {
    const pattern = new RegExp(text, 'i');
    this.setState({
      filter: this.state.original.filter(o => o.time.search(pattern) !== -1 || o.note.search(pattern) !== -1),
    });
  };

  renderItem = item => {
    return (
      <Card>
        <CardItem header bordered>
          <Text>{moment(item.time).calendar()}</Text>
        </CardItem>
        <CardItem bordered>
          <Body>
            <Text>{item.note}</Text>
          </Body>
        </CardItem>
      </Card>
    );
  };

  render() {
    return (
      <AppScreenWrapper loading={this.state.loading}>
        <Header searchBar rounded>
          <Item>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
            <Icon name="ios-search" />
            <Input placeholder="Search" placeholderTextColor={color.inactive} onChangeText={text => this.onSearchInputChanged(text)} />
          </Item>
        </Header>
        <Content padder>
          <List dataArray={this.state.filter} renderRow={item => this.renderItem(item)} enableEmptySections />
        </Content>
      </AppScreenWrapper>
    );
  }
}

export default Log;
