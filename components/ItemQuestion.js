/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Text,
  Content,
  List,
  ListItem,
  CheckBox,
  Body,
  Left,
  Radio,
  Right,
  Button,
  Icon,
  View,
  Toast,
} from 'native-base';
import randomize from 'randomatic';
import {styles, color} from '../styles';

class ItemQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: [],
    };
  }

  _checked = o =>
    this.state.answer.filter(y => y.ordinal === o.ordinal)[0] ? true : false;

  _onCheckMultipleOption = o => {
    const maxSelected = this.props.question.maxSelected;
    if (this.state.answer.length === maxSelected) {
      return Toast.show({
        text: 'You have only ' + maxSelected + ' selections',
        buttonText: 'Close',
      });
    }
    let checked = this._checked(o);
    this.setState({
      answer: checked
        ? this.state.answer.filter(ans => ans.ordinal !== o.ordinal)
        : [...this.state.answer, {ordinal: o.ordinal}],
    });
  };

  MultipleOptions = () => {
    const {question} = this.props;
    return (
      <List>
        <ListItem>
          <Text>Maximum selection: {question.maxSelected}</Text>
        </ListItem>
        {(question.options || []).map(o => (
          <ListItem noBorder key={o.ordinal + randomize('Aa0', 8)}>
            <CheckBox
              color={color.primary}
              checked={this._checked(o)}
              onPress={() => this._onCheckMultipleOption(o)}
            />
            <Body>
              <Text>
                {o.ordinal}. {o.name}
              </Text>
            </Body>
          </ListItem>
        ))}
      </List>
    );
  };

  SingleOption = () => {
    const {question} = this.props;
    return (
      <List>
        <ListItem>
          <Text>Select an option</Text>
        </ListItem>
        {(question.options || []).map(o => (
          <ListItem noBorder key={o.ordinal + randomize('Aa0', 8)}>
            <Left>
              <Text>
                {o.ordinal}. {o.name}
              </Text>
            </Left>
            <Right>
              <CheckBox
                checked={this._checked(o)}
                onPress={() => this.setState({answer: [{ordinal: o.ordinal}]})}
              />
            </Right>
          </ListItem>
        ))}
      </List>
    );
  };

  _onStar = (o, star) => {
    let checked = this._checked(o);
    this.setState({
      answer: checked
        ? this.state.answer.map(
            y => (y.ordinal !== o.ordinal ? y : {...y, star}),
          )
        : [...this.state.answer, {ordinal: o.ordinal, star}],
    });
  };

  _onUnStar = o => {
    this.setState({
      answer: this.state.answer.filter(y => y.ordinal !== o.ordinal),
    });
  };

  _renderStars = o => {
    let numStars =
      (this.state.answer.filter(y => y.ordinal === o.ordinal)[0] || {}).star ||
      0;
    return (
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {[1, 2, 3, 4, 5].map(i => (
          <Button
            transparent
            warning
            key={i}
            onPress={() => this._onStar(o, i)}>
            <Icon name={numStars >= i ? 'ios-star' : 'ios-star-outline'} />
          </Button>
        ))}
        <Button
          transparent
          danger
          disabled={!this._checked(o)}
          onPress={() => this._onUnStar(o)}
          style={{marginLeft: 15}}>
          <Icon name="trash" />
        </Button>
      </View>
    );
  };

  Rating = () => {
    const {question} = this.props;
    return (
      <List>
        {(question.options || []).map(o => (
          <ListItem
            noBorder
            style={{flexDirection: 'column'}}
            key={o.ordinal + randomize('Aa0', 8)}>
            <Text style={{flex: 1, alignSelf: 'flex-start'}}>
              {o.ordinal}. {o.name}
            </Text>
            {this._renderStars(o)}
          </ListItem>
        ))}
      </List>
    );
  };

  render() {
    const {question} = this.props;
    console.log(question);

    return (
      <Content padder>
        <Text
          style={{
            ...styles.fontOpenSans,
            fontWeight: '700',
            fontSize: 20,
            marginVertical: 15,
          }}>
          {question.ordinal} - {question.title || 'Title of question'}
        </Text>

        {question.type === 'Rating' ? (
          <this.Rating />
        ) : question.maxSelected > 1 ? (
          <this.MultipleOptions />
        ) : (
          <this.SingleOption />
        )}
      </Content>
    );
  }
}

export default ItemQuestion;
