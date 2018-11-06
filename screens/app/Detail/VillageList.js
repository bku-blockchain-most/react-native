/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import axios from 'axios';
import Button from '../../../components/common/Button';
import VillageDetail from '../../../components/common/VillageDetail';
import CheckBox from 'react-native-checkbox';
import Card from '../../../components/common/Card';
import CardSection from '../../../components/common/CardSection';
import urlJoin from 'url-join';
import config from '../../../config';

class VillageList extends Component {
  static navigationOptions = {
    title: 'Village',
  };

  state = {vils: [], checked: [], activeSections: []};

  componentWillMount() {
    axios.get(urlJoin(config.apiBlockchainTicket, 'villages')).then(response => this.setState({vils: response.data}));

    for (let x in this.state.vils) {
      this.state.checked[x] = false;
    }
  }

  renderVillage(props) {
    return this.state.vils.map(vil => (
      <View key={vil.village_name}>
        <Card key={vil.village_name}>
          <CardSection>
            <View style={{flexDirection: 'row', flex: 1}}>
              <View style={{flex: 6}}>
                <Text style={styles.headerTextStyle}>{vil.village_name}</Text>
              </View>
              <View style={styles.container1}>
                <CheckBox
                  key={vil.village_name}
                  label=""
                  checked={this.state.checked[this.props.key]}
                  checkboxStyle={{height: 30, width: 30}}
                  checkedImage={require('../../../assets/images/heart_checked3.png')}
                  uncheckedImage={require('../../../assets/images/heart_unchecked.png')}
                  onChange={checked =>
                    this.setState({
                      checked: !this.state.checked[this.props.key],
                    })
                  }
                />
              </View>
            </View>
          </CardSection>
        </Card>

        <VillageDetail key={vil.village_name} villageX={vil} text1={props} />
      </View>
    ));
  }

  render() {
    const {navigate} = this.props.navigation;
    const {params} = this.props.navigation.state;
    return (
      <View style={{flex: 1}}>
        <ScrollView>{this.renderVillage(this.props.text)}</ScrollView>
        <View>
          <Button
            buttonPress={() => {
              navigate('QrGen', {text: params.text});
            }}>
            Get Ticket
          </Button>
        </View>
      </View>
    );
  }
}
const styles = {
  container: {
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  headerTextStyle: {
    fontSize: 18,
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    marginLeft: 5,
    marginRight: 5,
  },
};

export default VillageList;
