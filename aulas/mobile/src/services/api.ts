import axios from 'axios';
import Config from 'react-native-config'

const api = axios.create({
    baseURL: 'http://192.168.0.197:3333'
});

export default api;