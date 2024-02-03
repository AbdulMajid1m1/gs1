
import axios from "axios";
import { baseUrl } from './config.jsx';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiMSIsImVtYWlsIjoiYWRtaW5AZ3Mxc2EubGluayIsImlzX3N1cGVyX2FkbWluIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzA2NTI1ODUxLCJleHAiOjE3MTQzMDE4NTF9.LtbNh_4O4bhFFvLRVPxveC40nNuv-MBlfiJTppMc1Sc'
const newRequest = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export default newRequest;