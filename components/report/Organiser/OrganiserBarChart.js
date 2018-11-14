import React, {
    Component
} from 'react';
import {
    processColor,
    View
} from 'react-native';

import {
    dataNTC,
} from '../create';
import _ from 'lodash';
import { BarChart, Grid,YAxis } from 'react-native-svg-charts';
import { LinearGradient, Stop, Defs } from 'react-native-svg';
import * as scale from 'd3-scale';

// const config = (color) => ({
//     drawValues: false,
//     colors: [processColor(color)],
// });
// const data = dataNTC();

// const color = ['blue', 'red', 'yellow'];
// const dt = {
//     "Quan tam": data.map(item => item.QT),
//     "Tham Du": data.map(item => item.TD),
//     "Tuong tac": data.map(item => item.TT)
// };

// const label = data.map(item => item.name);
// var index = 0;
// const dataset = _.map(dt, (value, key) => {
//     return {
//         values: value,
//         label: key,
//         config: config(color[index++])
//     };
// });
export default class Organiser extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        const data = [
            {
                value: 50,
                label: 'One',
            },
            {
                value: 10,
                label: 'Two',
            },
            {
                value: 40,
                label: 'Three',
            },
            {
                value: 95,
                label: 'Four',
            },
            {
                value: 85,
                label: 'Five',
            },
        ];

        const Gradient = () => (
            <Defs key={'gradient'}>
                <LinearGradient id={'gradient'} x1={'0%'} y={'0%'} x2={'0%'} y2={'100%'}>
                    <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'} />
                    <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'} />
                </LinearGradient>
            </Defs>
        )

        return (
            <View style={{ flexDirection: 'row', height: 200, paddingVertical: 16 }}>
                <YAxis
                    data={data}
                    yAccessor={({ index }) => index}
                    scale={scale.scaleBand}
                    contentInset={{ top: 10, bottom: 10 }}
                    spacing={0.2}
                    formatLabel={(_, index) => data[index].label}
                />
                    <BarChart
                    style={{ flex: 1, marginLeft: 8 }}
                    data={data}
                    horizontal={true}
                    yAccessor={({ item }) => item.value}
                    svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                    contentInset={{ top: 10, bottom: 10 }}
                    spacing={0.2}
                    gridMin={0}
                >
                    <Grid direction={Grid.Direction.VERTICAL}/>
                </BarChart>
            </View>
        )
    }
}