import axios from 'axios';

const instance = axios.create({
    'xsrfCookieName': 'north_Shore__Wave__Rider',
    'xsrfHeadereName': 'csrf-token',
});

export default instance;