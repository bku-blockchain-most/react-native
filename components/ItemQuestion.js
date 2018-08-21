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
} from 'native-base';
import {styles, color} from '../styles';

class ItemQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: this.props.question,
    };
  }

  MultipleOptions = () => {
    const {question} = this.props;
    return (
      <List>
        {question.options.map(o => (
          <ListItem noBorder>
            <CheckBox checked={false} color={color.primary} />
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
        {question.options.map(o => (
          <ListItem noBorder>
            <Left>
              <Text>
                {o.ordinal}. {o.name}
              </Text>
            </Left>
            <Right>
              <Radio selected={false} />
            </Right>
          </ListItem>
        ))}
      </List>
    );
  };

  Rating = () => {
    const {question} = this.props;
    return (
      <List>
        {question.options.map(o => (
          <ListItem noBorder style={{flexDirection: 'column'}}>
            <Text style={{flex: 1, alignSelf: 'flex-start'}}>
              {o.ordinal}. {o.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              {[1, 2, 3, 4, 5].map(i => (
                <Button transparent warning key={i}>
                  <Icon name="ios-star" />
                  {/* ios-star-outline */}
                </Button>
              ))}
            </View>
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
