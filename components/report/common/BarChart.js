import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor
} from 'react-native';

import {BarChart} from 'react-native-charts-wrapper';

class BarChartScreen extends React.Component {

  constructor(props) {
    super(props);

    this.dt = {
      legend: {
        enabled: true,
        textSize: 14,
        form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 0.5
      },
      data: {
        dataSets: [{
          values: [100,110,114,132,150,170,102,79,100],
          label: 'Bar dataSet',
          config: {
            color: processColor('blue'),
            barShadowColor: processColor('blue'),
            highlightAlpha: 90,
            highlightColor: processColor('blue'),
          }
        }],

        config: {
          barWidth: 0.3,
        }
      },
      highlights: [{x: 3}, {x: 6}],
      xAxis: {
        valueFormatter: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        textSize:13,
        drawGridLines:false,
        granularityEnabled: true,
        granularity : 1,
      }
    };
  }



  render() {
    this.dt.data.dataSets = this.props.dataset;
    this.dt.xAxis.valueFormatter = this.props.label;
    return (
      <View style={{flex: 1}}>

        <View style={styles.container}>
          <BarChart
            style={styles.chart}
            data={this.dt.data}
            xAxis={this.dt.xAxis}
            legend={this.dt.legend}
            drawBarShadow={false}
            drawValueAboveBar={true}
            chartDescription={{ text: '' }}
            drawHighlightArrow={true}
            highlights={this.dt.highlights}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  chart: {
    flex: 1
  }
});

export default BarChartScreen;
