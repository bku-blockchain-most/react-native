/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Icon, List, ListItem, Body} from 'native-base';
import {RefreshControl} from 'react-native';

// import FeedScreenWrapper from './_wrapper';
import AppScreenWrapper from '../_wrapper';
import {appApi} from '../../../api';
import {handleError} from '../../../utils';
import ItemPolling from '../../../components/ItemPolling';

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

  _onClickPollDetail = polling => {
    this.props.navigation.navigate('PollingDetail', {polling});
  };

  render() {
    return (
      <AppScreenWrapper loading={this.state.loading}>
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
            <ListItem onPress={() => this._onClickPollDetail(o)}>
              <Body>
                <ItemPolling poll={o} />
              </Body>
            </ListItem>
          )}
        />
      </AppScreenWrapper>
    );
  }
}

export default PollingListScreen;
