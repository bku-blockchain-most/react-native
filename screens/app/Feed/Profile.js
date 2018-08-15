/**
 * @format
 * @flow
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
  Button,
} from 'native-base';

import FeedScreenWrapper from './_wrapper';
import {getUserProfile} from '../../../utils';

class ProfileScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon
        name="account-location"
        type="MaterialCommunityIcons"
        style={{color: tintColor}}
      />
    ),
  };

  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };

    getUserProfile()
      .then(user => {
        this.setState({user});
      })
      .catch(err => console.log(err));
  }

  render() {
    const {user} = this.state;
    return (
      <FeedScreenWrapper>
        <List>
          <ListItem itemDivider>
            <Text>Personal</Text>
          </ListItem>

          <ListItem icon>
            <Left>
              <Button danger>
                <Icon
                  active
                  name="security-account"
                  type="MaterialCommunityIcons"
                />
              </Button>
            </Left>
            <Body>
              <Text>ID</Text>
            </Body>
            <Right>
              <Text>{user.id || 'Default user ID'}</Text>
            </Right>
          </ListItem>

          <ListItem icon>
            <Left>
              <Button success>
                <Icon active name="email" type="MaterialIcons" />
              </Button>
            </Left>
            <Body>
              <Text>Email</Text>
            </Body>
            <Right>
              <Text>{user.email || 'example.email@domain.com'}</Text>
            </Right>
          </ListItem>

          <ListItem itemDivider>
            <Text>Account</Text>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button primary>
                <Icon active name="ethereum" type="MaterialCommunityIcons" />
              </Button>
            </Left>
            <Body>
              <Text>Ethereum</Text>
            </Body>
            <Right>
              <Text>{(user.eth || {}).address || 'Default ETH Address'}</Text>
            </Right>
          </ListItem>
        </List>
      </FeedScreenWrapper>
    );
  }
}

export default ProfileScreen;
