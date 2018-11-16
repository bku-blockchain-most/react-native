import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

const Card2 = (props) => {
    return (
        <View style={styles.containerStyle}>
            {props.children}</View>
    );
};

const styles = {
    containerStyle: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
    }
};
export default Card2;
