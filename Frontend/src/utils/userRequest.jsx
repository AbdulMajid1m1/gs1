
import axios from "axios";
import { baseUrl } from './config.jsx';

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjEsIlVzZXJOYW1lIjoiQWJkdWwgTWFqaWQiLCJFbWFpbCI6IjU1IiwiQWRkZWRCeU1lbWJlcklEIjoiNiIsIklzU3VwZXJBZG1pbiI6ZmFsc2UsImlhdCI6MTY5Mjg1NDU2NCwiZXhwIjoxNzAwNjMwNTY0fQ.2N9jVx_uSXmaZLP9Rwoy2KWlZSMPMQafyuWBgv_NJpo'
const newRequest = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    // headers: {
    //     Authorization: `Bearer ${token}`,
    // },
});

export default newRequest;