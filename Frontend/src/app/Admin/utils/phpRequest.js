


import axios from "axios";
import { phpUrl } from './config.js';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IklyZmFuIiwiaWF0IjoxNTE2MjM5MDIyfQ.vx1SEIP27zyDm9NoNbJRrKo-r6kRaVHNagsMVTToU6A'

const phpRequest = axios.create({
    baseURL: phpUrl,
    headers: {
        Authorization: `Bearer ${token}`,
    },
    // withCredentials: true,
});





export default phpRequest;