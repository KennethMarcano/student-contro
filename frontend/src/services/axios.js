import axios from "axios";

export default axios.create({
    baseURL: 'http://35.199.67.52:81',
    headers: {
        'Origin': 'https://student-control.vercel.app'
      }
})