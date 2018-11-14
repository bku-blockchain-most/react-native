/**
 * @format
 * @flow
 * 1
 */

import React, {Component} from 'react';
import {
  Text,
  Icon,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Content,
  Button,
  Container,
  Header,
  Item,
  Input,
} from 'native-base';

import _ from 'lodash';

import {FlatList} from 'react-native';


// form of data load from database
const data = [
  {
    uid: "1",
    name: "Nguyen Van A"
  },
  {
    uid: "1",
    name: "Nguyen Van B"
  },
  {
    uid: "1",
    name: "Nguyen Van C"
  },
  {
    uid: "1",
    name: "Nguyen Van D"
  },
  {
    uid: "1",
    name: "Nguyen Van E"
  },
]

class ContactScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon
        name="contacts"
        type="MaterialIcons"
        style={{color: tintColor}}
      />
    ),
  };

  constructor(props) {
    super(props);

    this.state = {
      data: {
        original: [],
        filter: [],
      }
    };
  }

  componentWillMount(){
    this.getData();
  }

  
  getData = () => {
    // TODO
    // get data from database, form of data is above
    // var data = ...
    this.setState({
      data: {
        original: data, 
        filter: data
      }
    })
  }

  onSearchInputChanged = (event) => {
    const pattern = new RegExp(event.nativeEvent.text, 'i');
    const contacts = _.filter(this.state.data.original, contact => {
      const filterResult = {
        name: contact.name.search(pattern),
      };
      return filterResult.name !== -1 ? contact : undefined;
    });
    this.setState({
      data: {
        original: this.state.data.original,
        filter: contacts,
      },
    });
  };

  renderItem = ({ item }) => (
      <ListItem onPress = {() => {this.props.navigation.navigate('Log')}}>
        <Left>  
          <Text>{item.name}</Text>
        </Left>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>    
  );

  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" onChange ={this.onSearchInputChanged}/>
            <Icon
                name="qrcode-scan"
                type="MaterialCommunityIcons"
                onPress = {() => {this.props.navigation.navigate("QRCodeScanerContact")}}
            />
          </Item>
        </Header>
        <Content>
          <FlatList
            data={this.state.data.filter}
            renderItem={this.renderItem}
            enableEmptySections
          />
        </Content>
      </Container>
    );
  }
}

export default ContactScreen;
