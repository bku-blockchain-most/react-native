/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, Icon, Content, Header, List, Button, Item, Input, Card, CardItem, Body, Left,Segment,Thumbnail} from 'native-base';

import moment from 'moment';

import {ScrollView,StyleSheet,View} from 'react-native'

import AppScreenWrapper from '../_wrapper';
import {appApi} from '../../../api';
import {handleError, testMatch} from '../../../utils';
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
      isLogPressed: false,
      item: this.props.navigation.getParam('item')
    };
  }

  componentWillMount() {
    this.fetchContacts(this.state.item.id);
  }

  fetchContacts = (id) => {
    this.setState({loading: true});
    appApi
      .fetchRecords(id)
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
      filter: this.state.original.filter(o => testMatch(pattern, o, ['time', 'note'])),
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

  renderContentProfile = () => {
    if (!this.state.isLogPressed){
      return(
        <ScrollView automaticallyAdjustContentInsets={true} style={styles.container}>
            <View style={styles.avatarSection}>
              <Thumbnail source={{uri: this.state.item.photoUrl}} style={{width: 150, height: 150}} />
            </View>
            <View style={styles.infoSection}>
                <View style={styles.infoContent}>
                  <Text style={{...styles.label}}> FullName </Text>
                  <Text style={styles.text} maxLength={40} underlineColorAndroid="transparent"> {this.state.item.firstName + ' ' + this.state.item.lastName} </Text>
                </View>
                <View style={styles.line} />

                <View style={styles.infoContent}>
                  <Text style={{...styles.label}}> Email </Text>
                  <Text style={styles.text} maxLength={40} underlineColorAndroid="transparent"> {this.state.item.email} </Text>
                </View>
                <View style={styles.line} />

                <View style={styles.infoContent}>
                  <Text style={{...styles.label}}> Phone </Text>
                  <Text style={styles.text} maxLength={40} underlineColorAndroid="transparent"> {this.state.item.tel} </Text>
                </View>
                <View style={styles.line} />

                <View style={styles.infoContent}>
                  <Text style={{...styles.label}}> Company </Text>
                  <Text style={styles.text} maxLength={40} underlineColorAndroid="transparent"> {this.state.item.company} </Text>
                </View>
                <View style={styles.line} />

                <View style={styles.infoContent}>
                  <Text style={{...styles.label}}> Position </Text>
                  <Text style={styles.text} maxLength={40} underlineColorAndroid="transparent"> {this.state.item.position} </Text>
                </View>
                <View style={styles.line} />

               
              </View>
        </ScrollView>
      )
    }
  }

  handleLogPressed = () => {
    this.setState({
      isLogPressed: true,
    })
  }

  handleProfilePressed = () => {
    this.setState({
      isLogPressed: false,
    })
  }

  renderLogContent = () => {
    if (this.state.isLogPressed) {
        return (
          <Content padder>
            <List dataArray={this.state.filter} renderRow={item => this.renderItem(item)} enableEmptySections />
          </Content>
        )
    }
  }

  renderSearchBar = () => {
    if (this.state.isLogPressed) {
      return (
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" placeholderTextColor={color.inactive} onChangeText={text => this.onSearchInputChanged(text)} />
          </Item>
        </Header>
      )
    }
  }

  render() {
    return (
      <AppScreenWrapper loading={this.state.loading}>
       <Segment>
          <Button
            first
            style={{borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}
            active={!this.state.isLogPressed}
            onPress={() => this.handleProfilePressed()}>
            <Text>Profile</Text>
          </Button>
          <Button
            last 
            style={{borderTopRightRadius: 10, borderBottomRightRadius: 10}}
            active={this.state.isLogPressed}
            onPress={() => this.handleLogPressed()}>
            <Text>Log</Text>
          </Button>
        </Segment> 
        {this.renderSearchBar()}
        {this.renderLogContent()}
        {this.renderContentProfile()}
      </AppScreenWrapper>
    );
  }
}

const styles = StyleSheet.create({
  avatarSection: {
    marginTop: 15,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 150,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  infoSection: {
    flex: 1,
    marginTop: 20,
  },
  line: {
    backgroundColor: 'gainsboro',
    height: 1,
    marginTop: 8,
    marginBottom: 8,
  },
  infoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
  },
  text: {
    fontWeight: '400',
    textAlign: 'right',
  },
  passChangeSection: {
    backgroundColor: 'transparent',
  },
  passChangeHeader: {
    color: 'crimson',
    marginLeft: 15,
    fontSize: 18,
  },
  saveButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 12,
  },
  qrcodeSection: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  label: {
    color: 'lightslategray',
    opacity: 0.85,
  },
});


export default Log;
