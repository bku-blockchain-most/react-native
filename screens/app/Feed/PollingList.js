/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Icon, List, ListItem, Body, Segment, Button, Text, View} from 'native-base';
import {RefreshControl} from 'react-native';

import AppScreenWrapper from '../_wrapper';
import {appApi} from '../../../api';
import {handleError} from '../../../utils';
import ItemPolling from '../../../components/ItemPolling';

const RangeTime = {
  recently: 'Recently',
  past: 'Past',
  coming: 'Coming',
};

class PollingListScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => <Icon name="poll-box" type="MaterialCommunityIcons" style={{color: tintColor}} />,
  };

  constructor(props) {
    super(props);

    this.state = {
      pollings: [],
      refreshing: false,
      loading: false,
      rangeTime: RangeTime.recently,
    };

    this._fetchPollings();
  }

  _fetchPollings = () => {
    this.setState({loading: true});
    appApi
      .fetchPollings()
      .then(pollings => {
        this.setState({pollings, refreshing: false, loading: false});
      })
      .catch(err => handleError(err));
  };

  _fetchPollingsInPast = () => {
    this.setState({loading: true});
    appApi
      .fetchPollingsInPast()
      .then(pollings => {
        this.setState({pollings, refreshing: false, loading: false});
      })
      .catch(err => handleError(err));
  };

  _fetchPollingsInComing = () => {
    this.setState({loading: true});
    appApi
      .fetchPollingsInComing()
      .then(pollings => {
        this.setState({pollings, refreshing: false, loading: false});
      })
      .catch(err => handleError(err));
  };

  _onClickPollDetail = polling => {
    this.props.navigation.navigate('PollingDetail', {polling});
  };

  handleChangeRange = rangeTime => {
    if (rangeTime === this.state.rangeTime) {
      return;
    }

    this.setState({rangeTime});
    this.handleRefresh(rangeTime);
  };

  handleRefresh = rangeTime => {
    if (rangeTime === RangeTime.recently) {
      this._fetchPollings();
    } else if (rangeTime === RangeTime.past) {
      this._fetchPollingsInPast();
    } else if (rangeTime === RangeTime.coming) {
      this._fetchPollingsInComing();
    }
  };

  render() {
    const {rangeTime} = this.state;
    return (
      <AppScreenWrapper loading={this.state.loading}>
        <Segment>
          <Button
            first
            style={{borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}
            active={rangeTime === RangeTime.recently}
            onPress={() => this.handleChangeRange(RangeTime.recently)}>
            <Text>{RangeTime.recently}</Text>
          </Button>
          <Button active={rangeTime === RangeTime.past} onPress={() => this.handleChangeRange(RangeTime.past)}>
            <Text>{RangeTime.past}</Text>
          </Button>
          <Button
            last
            style={{borderTopRightRadius: 10, borderBottomRightRadius: 10}}
            active={rangeTime === RangeTime.coming}
            onPress={() => this.handleChangeRange(RangeTime.coming)}>
            <Text>{RangeTime.coming}</Text>
          </Button>
        </Segment>

        <List
          // TODO: pull to refresh is not working
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({refreshing: true});
                this.handleRefresh(rangeTime);
              }}
            />
          }
          dataArray={this.state.pollings}
          renderRow={o => (
            <ListItem onPress={() => this._onClickPollDetail(o)}>
              <Body>
                <ItemPolling poll={o} />
              </Body>
            </ListItem>
          )}
          enableEmptySections
        />

        {/* {this.state.pollings.length === 0 && (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <Text>No anything</Text>
          </View>
        )} */}
      </AppScreenWrapper>
    );
  }
}

export default PollingListScreen;
