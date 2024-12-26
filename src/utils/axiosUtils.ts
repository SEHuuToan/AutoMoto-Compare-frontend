import axios from 'axios';

// let HOST: string | null = null;
const HOST = import.meta.env.VITE_BASE_URL_LOCAL;
// const fetchLocalIPv4 = async (): Promise<string> => {
//     if (HOST) return HOST;
//     try {
//         const response = await axios.get('http://localhost:4000/api/get-ip'); 
//         HOST = `http://${response.data.ip}:4000`;
//         return HOST; 
//     } catch (error) {
//         console.error('Failed to fetch local IPv4:', error);
//         return 'http://localhost:4000'; 
//     }
// };


// const axiosInstance = async () => {
//     const baseURL = await fetchLocalIPv4();
//     return axios.create({
//         baseURL, 
//         withCredentials: true,
//     });
// };

const getAxiosConfig = () => {
    const accessToken = localStorage.getItem('accessToken');
    const axiosConfig = {
        headers: {
            Authorization: accessToken || '',
        }
    }
    return axiosConfig;
}
axios.interceptors.request.use(
    async (config) => {
      const accessToken = localStorage.getItem("accessToken")
  
      if (accessToken) {
        config.headers.Authorization = accessToken;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await axios.post(HOST + 'auth/refresh-token', {}, {
                    withCredentials: true,
                });
                const { accessToken } = response.data;
                localStorage.setItem('accessToken', accessToken);
                originalRequest.headers.Authorization = accessToken;
                return axios(originalRequest);
            } catch (error) {
                console.log(error);
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);


const axiosLogin = async (url: string, data: object) => {
    const res = await axios.post(HOST + url, data)
    return res;
}
const axiosLogout = async () => {
    const res = await axios.post(HOST + 'auth/logout');
    return res;
}
export {
    // axiosInstance,
    getAxiosConfig,
    axiosLogin,
    axiosLogout,
};
