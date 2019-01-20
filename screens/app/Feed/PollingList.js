/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Icon, List, ListItem, Body, Segment, Button, Text, Content} from 'native-base';
import {RefreshControl} from 'react-native';

import AppScreenWrapper from '../_wrapper';
import {appApi} from '../../../api';
import {handleError} from '../../../utils';
import ItemPolling from '../../../components/ItemPolling';
import {refreshControlColors, dynamicStyles} from '../../../styles';

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
  }

  componentWillMount() {
    this.setState({loading: true});
    this._fetchPollings();
  }

  _fetchPollings = () => {
    appApi
      .fetchPollings()
      .then(pollings => {
        this.setState({pollings, refreshing: false, loading: false});
      })
      .catch(err => {
        this.setState({loading: false, refreshing: false});
        handleError(err);
      });
  };

  _fetchPollingsInPast = () => {
    appApi
      .fetchPollingsInPast()
      .then(pollings => {
        this.setState({pollings, refreshing: false, loading: false});
      })
      .catch(err => {
        this.setState({loading: false, refreshing: false});
        handleError(err);
      });
  };

  _fetchPollingsInComing = () => {
    appApi
      .fetchPollingsInComing()
      .then(pollings => {
        this.setState({pollings, refreshing: false, loading: false});
      })
      .catch(err => {
        this.setState({loading: false, refreshing: false});
        handleError(err);
      });
  };

  _onClickPollDetail = polling => {
    this.props.navigation.navigate('PollingDetail', {polling});
  };

  handleChangeRange = rangeTime => {
    if (rangeTime !== this.state.rangeTime) {
      this.setState({rangeTime, loading: true});
      this.handleFetch(rangeTime);
    }
  };

  handleRefresh = rangeTime => {
    this.setState({refreshing: true});
    this.handleFetch(rangeTime);
  };

  handleFetch(rangeTime) {
    if (rangeTime === RangeTime.recently) {
      this._fetchPollings();
    } else if (rangeTime === RangeTime.past) {
      this._fetchPollingsInPast();
    } else if (rangeTime === RangeTime.coming) {
      this._fetchPollingsInComing();
    }
  }

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
        <Content scrollEnabled={false} contentContainerStyle={{flex: 1}}>
          <List
            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.handleRefresh(rangeTime)} colors={refreshControlColors} />}
            dataArray={this.state.pollings}
            renderRow={o => (
              <ListItem onPress={() => this._onClickPollDetail(o)} noBorder noIndent style={{...dynamicStyles.changeMargin(0)}}>
                <Body style={{...dynamicStyles.changePadding(0)}}>
                  <ItemPolling poll={o} />
                </Body>
              </ListItem>
            )}
            enableEmptySections
            style={{...dynamicStyles.changePadding(4), ...dynamicStyles.changeMargin(5), flex: 1}}
          />
        </Content>
      </AppScreenWrapper>
    );
  }
}

export default PollingListScreen;
