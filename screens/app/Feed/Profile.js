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

import QRCode from 'react-native-qrcode';

import FeedScreenWrapper from './_wrapper';
//import {getUserProfile} from '../../../utils';

class ProfileScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon
        name="account-location"
        type="MaterialCommunityIcons"
        style={{color: tintColor}}
      />
    ),
    title: "Profile"
  };

  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };

    // getUserProfile()
    //   .then(user => {
    //     this.setState({user});
    //   })
    //   .catch(err => console.log(err));
  }

  render() {
    const {user} = this.state;
    return (
      <FeedScreenWrapper>
        <List>
          <ListItem style={{ justifyContent: 'center',alignItems: 'center', flexDirection: 'column'}}>
            <QRCode
              value={JSON.stringify({
                  uid: "UID1234",
                  name: "Cristiano Ronaldo",
                  phone: "01692536412",
                  email: "email@domain.com",
                  major: "Computer Science",
                  company: "IBL"
              })}
              size={150}
              bgColor='purple'
              fgColor='white'
            />
            <Text style={{marginTop: 5, color : '#000011', fontWeight: 'bold', fontSize: 20}}> Cristiano Ronaldo </Text>
          </ListItem>


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
              <Text >Email</Text>
            </Body>
            <Right>
              <Text>{user.email || 'email@domain.com'}</Text>
            </Right>
          </ListItem>

          <ListItem icon>
            <Left>
              <Button success>
                <Icon active name="phone" type="MaterialCommunityIcons" />
              </Button>
            </Left>
            <Body>
              <Text>Phone</Text>
            </Body>
            <Right>
              <Text>{user.email || '01658625486'}</Text>
            </Right>
          </ListItem>

          <ListItem icon>
            <Left>
              <Button success>
              <Icon active name="graduation-cap" type="FontAwesome" />
              </Button>
            </Left>
            <Body>
              <Text>Major</Text>
            </Body>
            <Right>
              <Text>{user.email || 'Computer Science'} </Text>
            </Right>
          </ListItem>

          <ListItem icon>
            <Left>
              <Button success>
              <Icon active name="business" type="MaterialIcons" />
              </Button>
            </Left>
            <Body>
              <Text>Company</Text>
            </Body>
            <Right>
              <Text>{user.email || 'IBL'} </Text>
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
            <Body style = {{width: 80}} >
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
