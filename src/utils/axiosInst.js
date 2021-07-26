import axios from "axios";

const axiosInst = axios.create({
            baseURL: 'http://143.198.172.122/api',
            timeout: 1000,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'  
            }
          });
    

export default axiosInst