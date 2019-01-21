/**
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, View, processColor} from 'react-native';

import {HorizontalBarChart} from 'react-native-charts-wrapper';

class HBarChart extends React.Component {
  constructor() {
    super();

    //   this.state = {
    //     legend: {
    //       enabled: true,
    //       textSize: 14,
    //       form: 'SQUARE',
    //       formSize: 14,
    //       xEntrySpace: 10,
    //       yEntrySpace: 5,
    //       formToTextSpace: 5,
    //       wordWrapEnabled: true,
    //       maxSizePercent: 0.5,
    //     },
    //     data: {
    //       dataSets: [{
    //         values: [{y: 100}, {y: 105}, {y: 102}, {y: 110}, {y: 114}, {y: 109}, {y: 105}, {y: 99}, {y: 95}],
    //         label: 'Bar dataSet',
    //         config: {
    //           color: processColor('teal'),
    //           barShadowColor: processColor('lightgrey'),
    //           highlightAlpha: 90,
    //           highlightColor: processColor('red'),
    //         }
    //       }],
    //     },
    //     xAxis: {
    //       valueFormatter: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    //       position: 'BOTTOM',
    //       granularityEnabled: true,
    //       granularity: 1,
    //       labelCount: 10,
    //     },
    //     yAxis: {left:{axisMinimum: 0}}
    //   };
    // }

    // handleSelect(event) {
    //   let entry = event.nativeEvent
    //   if (entry == null) {
    //     this.setState({...this.state, selectedEntry: null})
    //   } else {
    //     this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
    //   }
  }

  render() {
    this.dt = this.props.data;
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <HorizontalBarChart
            style={styles.chart}
            data={this.dt.data}
            xAxis={this.dt.xAxis}
            yAxis={this.dt.yAxis}
            animation={{durationX: 2000}}
            legend={this.dt.legend}
            gridBackgroundColor={processColor('#ffffff')}
            drawBarShadow={false}
            drawValueAboveBar={true}
            drawHighlightArrow={true}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  chart: {
    flex: 1,
  },
});

export default HBarChart;
