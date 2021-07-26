import axios from "axios";

const token = localStorage.getItem('token')


const axiosInstance = axios.create({
            baseURL: 'http://143.198.172.122/api',
            timeout: 1000,
            headers: {
                'Authorization': 'Bearer '+ token,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'  
            }
          });
    

export default axiosInstance