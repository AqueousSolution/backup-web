import axios from "axios";

const axiosInst = axios.create({
            baseURL: 'https://www.mybackup.com.ng/api',
            timeout: 3000,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'  
            }
          });
    

export default axiosInst