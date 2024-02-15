import axios from 'axios';
const URL_SERVER = 'http://127.0.0.1:4513/';
// fazendo a conexão com o backend pelo axios 
const api = axios.create({

    baseURL: URL_SERVER
});

export default api;
