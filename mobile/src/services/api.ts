import Axios from 'axios'
import { apiIP } from '../utils/configs'

export default Axios.create({
    baseURL: `http://${apiIP}:3334`
})