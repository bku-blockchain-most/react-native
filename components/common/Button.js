import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const Button = ({ buttonPress, children, }) => {

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
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#00BFFF',
        marginLeft: 5,
        marginRight: 5,
    },
    textStyle: {
        alignSelf: 'center',
        color: '#00BFFF',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
    }
}
export default Button;