
import axios from 'axios'
import { Platform } from 'react-native'

const LOCAL_API_URL=Platform.select({
    android:"http://192.168.0.100:5000/api",
    ios:"http://192.168.0.100:5000/api",
    default:"http://localhost:5000/api",
})
//exp://192.168.0.100:8081

const api=axios.create({baseURL:LOCAL_API_URL})

export default api;