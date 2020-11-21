import axios from "axios"
import { baseURL } from "../../global"
import * as constants from '../../config/constants/constants'


const api = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data; charset=utf-8"
    }
})

export default {
    /**
     * List total amount data
     */
    listStats(id, token) {
        return api.get(constants.LIST_STATS, { params: { id, token } })
    }
}