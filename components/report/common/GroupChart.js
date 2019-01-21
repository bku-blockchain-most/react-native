/**
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, View, processColor} from 'react-native';

import {BarChart} from 'react-native-charts-wrapper';
import _ from 'lodash';

export default class GroupChartScreen extends React.Component {
  constructor() {
    super();

    this.dt = {
      legend: {
        enabled: true,
        textSize: 14,
        form: 'SQUARE',
        formSize: 14,
        wordWrapEnabled: true,
      },
      data: {
        dataSets: [
          {
            values: [5, 40, 77, 81, 43],
            label: 'Company A',
            config: {
              drawValues: false,
              colors: [processColor('red')],
            },
          },
          {
            values: [40, 5, 50, 23, 79],
            label: 'Company B',
            config: {
              drawValues: false,
              colors: [processColor('blue')],
            },
          },
          {
            values: [10, 55, 35, 90, 82],
            label: 'Company C',
            config: {
              drawValues: false,
              colors: [processColor('green')],
            },
          },
        ],
        config: {
          barWidth: 0.2,
          group: {
            fromX: 0,
            groupSpace: 0.4,
            barSpace: 0.1,
          },
        },
      },
      xAxis: {
        valueFormatter: ['1990', '1991', '1992', '1993'],
        granularityEnabled: true,
        granularity: 1,
        axisMaximum: 6,
        axisMinimum: 0,
        centerAxisLabels: true,
        scaleEnabled: true,
      },

      marker: {
        enabled: true,
        markerColor: processColor('#F0C0FF8C'),
        textColor: processColor('white'),
        markerFontSize: 14,
      },
    };
  }

  render() {
    const newdata = _.cloneDeep(this.dt);
    newdata.data.dataSets = this.props.dataset;
    newdata.xAxis.valueFormatter = this.props.label;
    return (
      <View style={styles.container}>
        <BarChart
          style={styles.chart}
          xAxis={newdata.xAxis}
          data={newdata.data}
          legend={newdata.legend}
          chartDescription={{text: ''}}
          drawValueAboveBar={false}
          highlights={newdata.highlights}
          marker={newdata.marker}
        />
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
