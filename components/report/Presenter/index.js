import React, { Component } from 'react';
import { View, Picker,Text } from 'react-native';
import Presenter from './Presenter';
import {Header } from 'react-native-elements';
import database from '../database.json';
export default class Presenters extends Component {
    static navigationOptions = {
        title: 'Người trình bày',
      };
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0
        }
        this.updateIndex = this.updateIndex.bind(this)
    }

    updateIndex(selectedIndex) {
        this.setState({ selectedIndex })
    } 

   

    render() {
        const boothname = database.boothName.map(item => item.name)
        const boothId = database.boothName.map(item => item.id)
        const { selectedIndex } = this.state
        return (
            <View style={{ flex: 1 }}>
            <Header
                        placement="left"
                        centerComponent={<Text style={{fontSize:30,color:'white' }} >{Presenters.navigationOptions.title.toLocaleUpperCase()}</Text>}
                        backgroundColor="#ff0000"
                    />
                <Picker 
                    selectedValue={boothname[this.state.selectedIndex]}
                    style={{ height: 50, width: 200}}
                    onValueChange={(itemValue, itemIndex) => this.setState({ selectedIndex: itemIndex })}>
                    {boothname.map(item=>{
                        return (
                            <Picker.Item label={item} value={item} key={item} />
                        );
                    })}
                </Picker>
                <Presenter booth={boothId[selectedIndex]}/>
            </View>
        );

    }
}
// const buttons = ['Số liệu', 'Biểu đồ']
//         const { selectedIndex } = this.state
//         if(selectedIndex==0)
//         return (
//             <View style={{flex:1}}>
//             <ButtonGroup
//                 onPress={this.updateIndex}
//                 selectedIndex={selectedIndex}
//                 buttons={buttons}
//                 containerStyle={{ height: 30 }}
//                 selectedButtonStyle={{backgroundColor:'cyan'}}
//             />
//             <PresenterChart />
//             </View>
//         );