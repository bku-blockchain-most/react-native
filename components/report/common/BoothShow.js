/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Linking, Text} from 'react-native';
import {Card, Rating, Button} from 'react-native-elements';

class BoothShow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card title={this.props.data.title} image={{uri: this.props.data.avatar}}>
        <Text>{this.props.data.description.describle}</Text>
        <Rating showRating type="star" fractions={1} imageSize={40} startingValue={this.props.data.ratingPoint} style={{paddingVertical: 10}} />
        <Text>Số người tham gia: {this.props.data.description.attend}</Text>
        <Text>Số người quan tâm: {this.props.data.description.care}</Text>
        <Text>Số chuyên gia: {this.props.data.description.expert}</Text>
        <Text>Vốn kêu gọi: {this.props.data.description.capital}</Text>
        <Button title="Go to booth" onPress={() => Linking.openURL(this.props.data.link)} />
      </Card>
    );
  }
}

export default BoothShow;
