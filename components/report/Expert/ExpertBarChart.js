import React, {
    Component
} from 'react';
import {
    View,
    processColor,
    ViewPagerAndroid
} from 'react-native';
import GroupChart from '../common/GroupChart';
import _ from 'lodash';
import NewPie from '../common/NewPie';


const config = (color) => ({
    drawValues: false,
    colors: [processColor(color)],
});

const color = ['blue', 'red', 'yellow'];
var index = 0;

export default class ExpertBarChart extends Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        let data=this.props.data;
        if(this.props.filter !='All')
            data=this.props.data.filter(item=>item.category==this.props.filter);
        const label = data.map(item => item.title);
        console.log('label',label,'s');
        const dt = {
            "Quan tam": data.map(item => item.description.care),
            "Tham Du": data.map(item => item.description.attend),
            "Tuong tac": data.map(item => item.interactive)
        };
        const dataset = _.map(dt, (value, key) => {
            return {
                values: value,
                label: key,
                config: config(color[index++])
            };
        });
        const dtCreate=data.map(item => {
                return {
                    label : item.title,
                    value: item.description.attend
                };
            });

        return (
            <View style={{ flex: 1 }}>
            <ViewPagerAndroid
                style={styles.viewPager}
                initialPage={0}>
                <View style={styles.pageStyle} key="1">
                     <GroupChart dataset={dataset} label={label}
                     xAxis={{ centerAxisLabels: true }} />
                </View>
                <View style={styles.pageStyle} key="2">
                    <NewPie data={dtCreate}/>
                </View>
            </ViewPagerAndroid>
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
};
