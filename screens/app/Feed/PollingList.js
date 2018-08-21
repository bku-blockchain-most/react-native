/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Icon, List, ListItem} from 'native-base';
import {TouchableOpacity, RefreshControl} from 'react-native';

import FeedScreenWrapper from './_wrapper';
import {fetchPollings} from '../../../api/app/polling';
import {handleError} from '../../../utils';
import ItemPolling from '../../../components/ItemPolling';

class PollingListScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon
        name="poll-box"
        type="MaterialCommunityIcons"
        style={{color: tintColor}}
      />
    ),
  };

  constructor(props) {
    super(props);

    this.state = {
      pollings: [],
      refreshing: false,
    };

    this._fetchPollings();
  }

  _fetchPollings = () => {
    fetchPollings()
      .then(pollings => {
        this.setState({pollings, refreshing: false});
      })
      .catch(err => handleError(err));
  };

  _onClickPollDetail = polling => {
    this.props.navigation.navigate('PollingDetail', {polling});
  };

  render() {
    return (
      <FeedScreenWrapper>
        <List
          // TODO: pull to refresh is not working
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({refreshing: true});
                this._fetchPollings();
              }}
            />
          }
          dataArray={this.state.pollings}
          renderRow={o => (
            <TouchableOpacity onPress={() => this._onClickPollDetail(o)}>
              <ItemPolling poll={o} />
            </TouchableOpacity>
          )}
        />
      </FeedScreenWrapper>
    );
  }
}

export default PollingListScreen;
