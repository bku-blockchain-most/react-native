/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Image} from 'react-native';
import {Text, Content, Footer, Button, Spinner, Icon, View} from 'native-base';

import DetailScreenWrapper from './_wrapper';
import {color} from '../../../styles';

class VillageDetail extends Component {
  constructor(props) {
    super(props);

    const {navigation} = this.props;
    this.village = navigation.getParam('village');

    this.state = {
      loading: false,
      refreshing: false,
      loadingInterest: false,
      interested: false,
    };
  }

  componentWillMount() {
    this.setState({loadingInterest: false});
  }

  render() {
    const {navigation} = this.props;
    const {village} = this;
    return (
      <DetailScreenWrapper titleHeader={village.village_name} navigation={navigation} loading={this.state.loading}>
        <Content padder>
          <Text style={{fontWeight: '700', color: color.primary, fontSize: 20, marginTop: 10}}>{village.village_name || ''}</Text>
          <Text style={{marginTop: 12}}>Location: {village.location || ''}</Text>
          <Text style={{marginTop: 8}}>Head: {village.village_head || ''}</Text>
          <Image source={{uri: village.photo_url || ''}} style={{height: 200, marginTop: 8}} />
          <Text style={{marginTop: 12}}>Description:</Text>
          <Text style={{marginTop: 6}}>{village.description || ''}</Text>
        </Content>
        <Footer>
          <View style={{width: '100%', height: '100%', flex: 1, justifyContent: 'center', backgroundColor: color.white, paddingHorizontal: 10, paddingVertical: 8}}>
            {this.state.loadingInterest ? (
              <Spinner color={color.primary} />
            ) : this.state.interested ? (
              <Button block danger iconRight style={{width: '100%', height: '100%'}} onPress={() => this.setState({interested: false})}>
                <Text>Following</Text>
                <Icon name="heart" type="Feather" />
              </Button>
            ) : (
              <Button bordered danger iconRight style={{width: '100%', height: '100%', justifyContent: 'center'}} onPress={() => this.setState({interested: true})}>
                <Text>Follow</Text>
                <Icon name="heart" type="Feather" />
              </Button>
            )}
          </View>
        </Footer>
      </DetailScreenWrapper>
    );
  }
}

export default VillageDetail;
