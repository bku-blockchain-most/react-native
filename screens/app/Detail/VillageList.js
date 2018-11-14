/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ScrollView, Text, View,Image } from 'react-native';
import axios from 'axios';
import Button2 from '../../../components/common/Button2';
import VillageDetail from '../../../components/common/VillageDetail';
import CheckBox from 'react-native-checkbox';
import Card from '../../../components/common/Card';
import CardSection from '../../../components/common/CardSection';
import urlJoin from 'url-join';
import config from '../../../config';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
class VillageList extends Component {
  static navigationOptions = {
    title: 'Village',
  };
  state = { vils: [], checked: [], activeSections: [] };

  componentWillMount() {
    axios.get('http://blockchain-ticket.herokuapp.com/villages').then(response => {
      this.setState({ vils: response.data });
      for (let x in this.state.vils) {
        this.setState({
          checked: this.state.checked.concat(false)
        });
      }

    });
  }
  _renderSectionTitle = section => {
    return (
      <View>
        {/* <Text>{section.content}</Text> */}
        <Text></Text>
      </View>
    );
  };

  _renderHeader(section, index, isActive, sections) {
    return (
      <Animatable.View
        duration={300}
        transition="backgroundColor"
        style={{ backgroundColor: (isActive ? 'rgba(129, 207, 224, 1)' : 'rgba(255,255,255,1)'), flexDirection: 'row' }}>
        <Text style={{ fontSize: 18, flex: 8 }}>{section.village_name}</Text>

        <Image
          style={styles.imageStyle}
          source={require('./images/down_arrow2.png')}
        />

      </Animatable.View>
    );
  }
  _updateSections = activeSections => {
    this.setState({ activeSections });
  };
  renderVillage(props) {
    return this.state.vils.map((vil,index) => 
        <View key={vil.village_name}>
            
            <View style={styles.containerStyle}>
                <CardSection>
                    <View style={{flexDirection:'row',flex:1}}> 
                        <View style={{flex:6}}>                    
                            <Text style = {styles.headerTextStyle}>{vil.village_name}</Text>
                        </View>
                        <View style={styles.container1}>
                            <CheckBox
                                label=''
                                checked={this.state.checked[index]}
                                checkboxStyle={{height:30,width:30}}
                                checkedImage={require('./images/heart_checked3.png')}
                                uncheckedImage={require('./images/heart_unchecked.png')}
                                onChange={(checked) => {
                                    let a = this.state.checked;
                                    a[index] = !this.state.checked[index];
                                    this.setState({checked: a});
                                                    }}
                            />
                        </View>
                    </View>     
                </CardSection>
            </View>
            <VillageDetail key={vil.village_name} villageX={vil} text1={props} />
        </View>
        
    );
}
  _renderContent(section, i, isActive, sections) {
    return (
      <View >

        <View style={styles.containerStyle}>
          <CardSection>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <View style={{ flex: 6 }}>
                <Text style={styles.headerTextStyle}>{section.village_name}</Text>

              </View>
              <View style={styles.container1}>
                <CheckBox
                  label=''
                  checked={this.state.checked[i]}
                  checkboxStyle={{ height: 30, width: 30 }}
                  checkedImage={require('./images/heart_checked3.png')}
                  uncheckedImage={require('./images/heart_unchecked.png')}
                  onChange={(checked) => {
                    let a = this.state.checked;
                    a[i] = !this.state.checked[i];
                    this.setState({ checked: a });
                  }}
                />
              </View>
            </View>
          </CardSection>
        </View>
        <VillageDetail key={section.village_name} villageX={section} />
      </View>
    );
  }

  getStateChecked(i) {
    // this.setState({checked: [true,true,true]})
    // Alert.alert("this.state.vils[i].village_name");
  }

  onButtonPress(text, checkss) {
    axios(
      {
        method: 'post',
        url: 'https://blockchain-ticket.herokuapp.com/interests/',
        data: {
          checks: checkss,
          uid: text
        }
      }
    ).then(response => Alert.alert('OK')
    );

  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.container3}>
            <Accordion
              sections={this.state.vils}
              activeSections={this.state.activeSections}
              renderSectionTitle={this._renderSectionTitle}
              renderHeader={this._renderHeader}
              renderContent={this._renderContent.bind(this)}
              onChange={this._updateSections}
              expandMultiple
              sectionContainerStyle={styles.container2}
            >
            </Accordion>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Button2 buttonPress={() => { this.onButtonPress(this.props.text, this.state.checked); }}>
              Click here to send your Interest
              </Button2>
          </View>
        </ScrollView>
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
    marginRight: 5
  },
  headerTextStyle: {
    fontSize: 18,
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    marginLeft: 5,
    marginRight: 5
  },
  containerStyle: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  container2: {
    backgroundColor: 'white',
    flex: 1,
  },
  container3: {
    backgroundColor: 'white',
    padding: 5,
    justifyContent: 'flex-start',
    borderColor: '#ddd',
    position: 'relative',
  },
  imageStyle: {
    height: 10,
    width: 10,
    flex: 1,
    marginTop: 5
  },
};
export default VillageList;
