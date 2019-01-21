/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Card, Button, List, Icon} from 'react-native-elements';
import {FlatList, Text} from 'react-native';

const list = [
  {
    name: 'Organiser',
    avatar_url: 'https://cdn1.iconfinder.com/data/icons/professions-filled-line/160/27-512.png',
    //description: 'Báo cáo thống kê dành cho nhà tổ chức sự kiện. Báo cáo chi tiết về số lượng người tham dự, số vé phát hành,...'
  },
  {
    name: 'Presenter',
    avatar_url: 'https://previews.123rf.com/images/yupiramos/yupiramos1612/yupiramos161219133/68207107-news-presenter-avatar-character-vector-illustration-design.jpg',
    //description: 'Báo cáo thống kê dành cho những người trình bày. Báo cáo về số lượng người tham dự buổi trình bày, phân loại ngườ dùng,...'
  },
  {
    name: 'Expert',
    avatar_url: 'https://cdn1.iconfinder.com/data/icons/managers-15/430/Untitled-34-512.png',
    //description: 'Báo cáo thống kê dành cho chuyên gia. Báo cáo về những chủ đề đang hot, có nhiều người quan tâm,...'
  },
];
export default class App extends Component {
  constructor(props) {
    super(props);
  }
  renderRow({item}) {
    const navigate = this.props.nav;
    return (
      <Card title={item.name} image={{uri: item.avatar_url}}>
        <Text style={{marginBottom: 10}}>{item.description}</Text>
        <Button
          icon={<Icon name="code" color="#ffffff" />}
          backgroundColor="#03A9F4"
          onPress={() => navigate(item.name)}
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title="VIEW NOW"
        />
      </Card>
    );
  }

  render() {
    return (
      <List>
        <FlatList data={list} renderItem={this.renderRow.bind(this)} keyExtractor={item => item.name} />
      </List>
    );
  }
}
