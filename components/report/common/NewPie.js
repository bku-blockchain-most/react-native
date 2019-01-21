/**
 * @format
 * @flow
 */

import {PieChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import React from 'react';

const screenWidth = Dimensions.get('window').width;
const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientTo: '#08130D',
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
};

const color = ['blue', 'red', 'pink', 'orange', 'yellow', 'green'];

class NewPie extends React.Component {
  constructor() {
    super();
  }

  render() {
    const dt = this.props.data; //[1,2,3,4]
    //const label=this.props.label;//['a','b','c']
    const data = dt.map((item, index) => {
      return {
        name: item.label,
        population: item.value,
        color: color[index],
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      };
    });

    return <PieChart data={data} width={screenWidth} height={220} chartConfig={chartConfig} accessor="population" backgroundColor="transparent" paddingLeft="15" />;
  }
}

export default NewPie;
