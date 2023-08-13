import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://interest-match.vercel.app'
})

export default instance;