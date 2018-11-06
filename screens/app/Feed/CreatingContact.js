/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Container, List, ListItem,Left,Right, Item, Input, Button, Icon, Text,Textarea, Form, Toast} from 'native-base';


class CreatingContact extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon
        name="account-location"
        type="MaterialCommunityIcons"
        style={{color: tintColor}}
      />
    ),
  };

  constructor(props){
    super(props);
    this.state = {
      // my uid if you need to identify
      //uid: this.props.navigation.getParam('uid',''),

      // uid of user has been just scan
      uidUser: this.props.navigation.getParam('uidUser',''),
      name: this.props.navigation.getParam('name',''),
      phone: this.props.navigation.getParam('phone',''),
      email: this.props.navigation.getParam('email',''),
      major: this.props.navigation.getParam('major',''),
      company: this.props.navigation.getParam('company',''),
      time: this.props.navigation.getParam('time',''),
      note: 'Note'
    }

    // check user is added or not ? 
  }

  onAddPressed = () => {
    // TODO
    // Update database ...

    Toast.show({
      text: "Successfully",
      buttonText: "Ok",
      buttonTextStyle: { color: "#008000" },
      buttonStyle: { backgroundColor: "#5cb85c" }
    });
    this.props.navigation.navigate('Contact')
  }

  render() {
    return (
       <Container>
         <List>
            <Item>
              <Text style = {{width: 80, marginLeft:5}}>Name</Text>
              <Input placeholder='Enter your name' value = {this.state.name}
                    onChangeText = {name => this.setState({name})}/>
            </Item>

            <Item>
              <Text style = {{width: 80, marginLeft:5}} >Email</Text>
              <Input placeholder='Enter your email' value = {this.state.email}
                      onChangeText = {email => this.setState({email})}/>
            </Item>

            <Item>
              <Text style = {{width: 80, marginLeft:5}}>Major</Text>
              <Input placeholder='Enter your major' value = {this.state.major}
                    onChangeText = {major => this.setState({major})}/>
            </Item>

            <Item>
              <Text style = {{width: 80, marginLeft:5}}>Phone</Text>
              <Input placeholder='Enter your phone' value = {this.state.phone}
                    onChangeText = {phone => this.setState({phone})}/>
            </Item>

            <Item>
              <Text style = {{width: 80, marginLeft:5}}>Company</Text>
              <Input placeholder='Enter your company' value = {this.state.company}
                    onChangeText = {company => this.setState({company})}/>
            </Item>

            <Form>
              <Textarea rowSpan={5} bordered placeholder="Note" value = {this.state.note} 
                        onChangeText = {note => this.setState({note})}/>
            </Form>

            <Button full style = {{marginTop: 25}} onPress = {() => {this.onAddPressed()}}>
              <Text>Add</Text>
            </Button>
          </List>
       </Container>
    );
  }
}

export default CreatingContact;
