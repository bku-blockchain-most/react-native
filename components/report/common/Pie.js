/**
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, View, processColor} from 'react-native';

import {PieChart} from 'react-native-charts-wrapper';

class Pie extends React.Component {
  constructor() {
    super();

    //   this.dt = {
    //     legend: {
    //       enabled: true,
    //       textSize: 15,
    //       form: 'CIRCLE',

    //       horizontalAlignment: "RIGHT",
    //       verticalAlignment: "CENTER",
    //       orientation: "VERTICAL",
    //       wordWrapEnabled: true
    //     },
    //     data: {
    //       dataSets: [{
    //         values: [{value: 45, label: 'Sandwiches'},
    //           {value: 21, label: 'Salads'},
    //           {value: 15, label: 'Soup'},
    //           {value: 9, label: 'Beverages'},
    //           {value: 15, label: 'Desserts'}],
    //         label: 'Pie dataset',
    //         config: {
    //           colors: [processColor('#C0FF8C'), processColor('#FFF78C'), processColor('#FFD08C'), processColor('#8CEAFF'), processColor('#FF8C9D')],
    //           valueTextSize: 20,
    //           valueTextColor: processColor('green'),
    //           sliceSpace: 5,
    //           selectionShift: 13,
    //           // xValuePosition: "OUTSIDE_SLICE",
    //           // yValuePosition: "OUTSIDE_SLICE",
    //           valueFormatter: "#.#'%'",
    //           valueLineColor: processColor('green'),
    //           valueLinePart1Length: 0.5
    //         }
    //       }],
    //     },
    //     highlights: [{x:2}],
    //     deion: {
    //       text: 'This is Pie chart deion',
    //       textSize: 15,
    //       textColor: processColor('darkgray'),

    //     }
    //   };
    // }
  }

  render() {
    const dt = this.props.data;
    return (
      <View style={styles.container}>
        <PieChart
          style={styles.chart}
          logEnabled={true}
          chartBackgroundColor={processColor('pink')}
          chartDeion={dt.deion}
          data={dt.data}
          legend={dt.legend}
          highlights={dt.highlights}
          entryLabelColor={processColor('green')}
          entryLabelTextSize={20}
          drawEntryLabels={true}
          rotationEnabled={true}
          rotationAngle={45}
          usePercentValues={true}
          styledCenterText={{text: 'Pie center text!', color: processColor('pink'), size: 20}}
          centerTextRadiusPercent={100}
          holeRadius={40}
          holeColor={processColor('#f0f0f0')}
          transparentCircleRadius={45}
          transparentCircleColor={processColor('#f0f0f088')}
          maxAngle={350}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chart: {
    flex: 1,
  },
});

export default Pie;
