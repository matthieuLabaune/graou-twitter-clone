import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://graou-backend.eu-1.sharedwithexpose.com/api'
})

export default instance;