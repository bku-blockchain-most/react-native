import {Platform} from 'react-native';

export default {
  apiUrl: `http://${Platform.OS === 'ios' ? '127.0.0.1' : '192.168.0.154'}:4200/api`,
};
