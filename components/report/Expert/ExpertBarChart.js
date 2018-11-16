import React, {
    Component
} from 'react';
import {
    View,
    processColor,
    ViewPagerAndroid
} from 'react-native';
import {
    VictoryChart,
    VictoryBar,
    VictoryGroup,
    VictoryTheme,
    VictoryCandlestick,
    VictoryLine,
    VictoryScatter,
    VictoryArea,
    VictoryStack,
    VictoryTooltip
  } from 'victory-native';
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
        let data = this.props.data;
        if (this.props.filter != 'All')
            {data = this.props.data.filter(item => item.category == this.props.filter);}
        const label = data.map(item => item.title);
        console.log('label', label, 's');
        const dt = {
            'Quan tam': data.map(item => item.description.care),
            'Tham Du': data.map(item => item.description.attend),
            'Tuong tac': data.map(item => item.interactive)
        };
        const dtCreate = data.map(item => {
            return {
                label: item.title,
                value: item.description.attend
            };
        });

        return (
            <View style={{ flex: 1 }}>
                <ViewPagerAndroid
                    style={styles.viewPager}
                    initialPage={0}>
                    <View style={styles.pageStyle} key="1">
                        <VictoryChart style={{flex:1}}
                        theme={VictoryTheme.material}
                        domainPadding={{y:10}}
                            domain ={{x:[0, dt['Quan tam'].length + 1]}}
                            >
                            <VictoryGroup
                            style={{flex:1}}
                                //labels={label}

                                offset={15}
                                height={500}
                                colorScale={'qualitative'}
                                categories={{ x: label }}
                                // horizontal={true}
                                animate={{
                                    duration: 2000,
                                    onLoad: { duration: 1000 }
                                  }}
                            >
                                <VictoryBar
                                    data={dt['Quan tam'].map((value, index) => ({ x: index + 1, y: value }))}

                                />
                                <VictoryBar
                                    data={dt['Tham Du'].map((value, index) => ({ x: index + 1, y: value }))}

                                />
                                <VictoryBar
                                    data={dt['Tuong tac'].map((value, index) => ({ x: index + 1, y: value }))}

                                />
                            </VictoryGroup>
                        </VictoryChart>
                    </View>
                    <View style={styles.pageStyle} key="2">
                        <NewPie data={dtCreate} />
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
