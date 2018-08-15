/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Icon} from 'native-base';
import {TouchableOpacity} from 'react-native';

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
    };

    this._fetchPollings();
  }

  _fetchPollings = () => {
    fetchPollings()
      .then(pollings => {
        this.setState({pollings});
      })
      .catch(err => handleError(err));
  };

  _onClickPollDetail = polling => {
    this.props.navigation.navigate('PollingDetail', {polling});
  };

  render() {
    return (
      <FeedScreenWrapper>
        {this.state.pollings.map(o => (
          <TouchableOpacity
            key={o.id}
            onPress={() => this._onClickPollDetail(o)}>
            <ItemPolling poll={o} />
          </TouchableOpacity>
        ))}
      </FeedScreenWrapper>
    );
  }
}

export default PollingListScreen;
