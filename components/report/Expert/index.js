import React, { Component } from 'react';
import { View, Text, ViewPagerAndroid, Picker } from 'react-native';
import { ButtonGroup, Header } from 'react-native-elements';
import ExpertStatistics from './ExpertStatistics';
import database from '../database.json';
import _ from 'lodash';
import ExpertBarChart from './ExpertBarChart';

export default class Expert extends Component {
    static navigationOptions = {
        title: 'Chuyên gia và nhà đầu tư',
    };
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            selectedCategory: 0
        }
        this.updateIndex = this.updateIndex.bind(this)
    }

    updateIndex(selectedIndex) {
        this.setState({ ...this.state, selectedIndex })
    }

    render() {
        const buttons = ['Số liệu', 'Biểu đồ']
        const { selectedIndex } = this.state;
        const category = [].concat(database.categoryInfo);
        const { boothName, boothInfo, categoryInfo } = database;
        const data = boothName.map((item, index) => {
            return {
                title: item.name,
                avatar: item.image,
                link: item.link,
                category: categoryInfo[boothInfo[index].categoryId],
                description: {
                    describle: item.describe,
                    care: boothInfo[index].statics.care,
                    attend: _.sum(_.valuesIn(boothInfo[index].statics.thanhPhan)),
                    expert: boothInfo[index].statics.thanhPhan['4'],
                    capital: item.capital
                },
                interactive: _.sum((_.valuesIn(boothInfo[index].statics.feedback))),
                ratingPoint: _.sum((_.valuesIn(boothInfo[index].statics.feedback)).map((it, id) => it * (id + 1))) / _.sum((_.valuesIn(boothInfo[index].statics.feedback)))
            };
        });
        if (selectedIndex == 0)
            return (
                <View style={{ flex: 1 }}>
                    <Header
                        placement="left"
                        centerComponent={<Text style={{ fontSize: 30, color: 'white' }} >{Expert.navigationOptions.title.toLocaleUpperCase()}</Text>}
                        backgroundColor="#ff0000"
                    />
                    <Picker
                        selectedValue={category[this.state.selectedCategory]}
                        style={{ height: 50, width: 200 }}
                        onValueChange={(itemValue, itemIndex) => this.setState({ ...this.state, selectedCategory: itemIndex })}>
                        {category.map(item => {
                            return (
                                <Picker.Item label={item} value={item} key={item} />
                            );
                        })}
                    </Picker>
                    <ButtonGroup
                        onPress={this.updateIndex}
                        selectedIndex={selectedIndex}
                        buttons={buttons}
                        containerStyle={{ height: 30 }}
                        selectedButtonStyle={{ backgroundColor: 'cyan' }}
                    />
                    <ExpertStatistics filter={category[this.state.selectedCategory]} data={data} />
                </View>
            );
        return (

            <View style={{ flex: 1 }}>
                <Header
                    placement="left"
                    centerComponent={<Text style={{ fontSize: 30, color: 'white' }} >{Expert.navigationOptions.title.toLocaleUpperCase()}</Text>}
                    backgroundColor="#ff0000"
                />
                <Picker
                    selectedValue={category[this.state.selectedCategory]}
                    style={{ height: 50, width: 200 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({ ...this.state, selectedCategory: itemIndex })}>
                    {category.map(item => {
                        return (
                            <Picker.Item label={item} value={item} key={item} />
                        );
                    })}
                </Picker>
                <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={selectedIndex}
                    buttons={buttons}
                    containerStyle={{ height: 30 }}
                    selectedButtonStyle={{ backgroundColor: 'cyan' }}
                />
                <ExpertBarChart filter={category[this.state.selectedCategory]} data={data} />
            </View>
        );
    }
}

var styles = {
    viewPager: {
        flex: 1
    },
    pageStyle: {
        flex: 1
    }
}