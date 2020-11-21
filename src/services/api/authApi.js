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
     * Login admin
     */
    login(email, password) {
        let formdata = new FormData()
        formdata.append('email', email)
        formdata.append('password', password)
        return api.post(constants.LOGIN, formdata)
    },
    /**
     * Logout admin
     */
    logout(id, token) {
        let formdata = new FormData()
        formdata.append('id', id)
        formdata.append('token', token)
        return api.post(constants.LOGOUT, formdata)
    },
    /**
     * Refresh token
     */
    validateToken(token) {
        let formdata = new FormData()
        formdata.append('token', token)
        return api.post(constants.VALIDATE_TOKEN, formdata)
    }
}