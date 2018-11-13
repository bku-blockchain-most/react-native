import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const Button2 = ({ buttonPress, children, }) => {

    const { buttonStyle, textStyle } = styles;

    return (
        <TouchableOpacity onPress={buttonPress} style={buttonStyle}>
            <Text style={textStyle}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = {
    buttonStyle: {
        backgroundColor: '#FFFFFF',
        borderColor: '#00BFFF',
        marginLeft: 5,
        marginRight: 5,
    },
    textStyle: {
        alignSelf: 'center',
        color: '#00BFFF',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 5,
        paddingBottom: 5,
    }
}
export default Button2;