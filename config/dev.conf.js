import {Platform} from 'react-native';

export default {
  apiUrl: `http://${Platform.OS === 'ios' ? '127.0.0.1' : '192.168.43.73'}:4200/api`,
};
