import axios from 'axios'
// ** Config
import apiConfig from 'src/configs/apiConfig'

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: apiConfig.HOST })

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || error)
)

export default axiosInstance
