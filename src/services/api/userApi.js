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
    * Register user by admin
    */
    registerUser(id, token, user_image, first_name, last_name, gender, birth_date, document, email, phone,
        zip_code, address_street, address_number, address_neighborhood, address_complement,
        address_reference, address_city, address_state, password) {
        let formdata = new FormData()
        formdata.append('id', id)
        formdata.append('token', token)
        formdata.append('user_image', user_image)
        formdata.append('first_name', first_name)
        formdata.append('last_name', last_name)
        formdata.append('gender', gender)
        formdata.append('birth_date', birth_date)
        formdata.append('document', document)
        formdata.append('email', email)
        formdata.append('phone', phone)
        formdata.append('zip_code', zip_code)
        formdata.append('address_street', address_street)
        formdata.append('address_number', address_number)
        formdata.append('address_neighborhood', address_neighborhood)
        formdata.append('address_complement', address_complement)
        formdata.append('address_reference', address_reference)
        formdata.append('address_city', address_city)
        formdata.append('address_state', address_state)
        formdata.append('password', password)
        return api.post(constants.REGISTER_USER_BY_ADMIN, formdata)
    },

    /**
     * Update user by admin
     */
    updateUser(id, token, user_id, user_image, first_name, last_name, gender, birth_date, email, phone,
        zip_code, address_street, address_number, address_neighborhood, address_complement,
        address_reference, address_city, address_state, password) {
        let formdata = new FormData()
        formdata.append('id', id)
        formdata.append('token', token)
        formdata.append('user_id', user_id)
        formdata.append('user_image', user_image)
        formdata.append('first_name', first_name)
        formdata.append('last_name', last_name)
        formdata.append('gender', gender)
        formdata.append('birth_date', birth_date)
        //formdata.append('document', document)
        formdata.append('email', email)
        formdata.append('phone', phone)
        formdata.append('zip_code', zip_code)
        formdata.append('address_street', address_street)
        formdata.append('address_number', address_number)
        formdata.append('address_neighborhood', address_neighborhood)
        formdata.append('address_complement', address_complement)
        formdata.append('address_reference', address_reference)
        formdata.append('address_city', address_city)
        formdata.append('address_state', address_state)
        if (password) {
            formdata.append('password', password)
        }
        console.log('form update user: ', formdata)
        return api.post(constants.UPDATE_USER_BY_ADMIN, formdata)
    },
    /**
     * Show a user
     */
    showUser(id, token, user_id) {
        return api.get(constants.SHOW_USER_BY_ADMIN, { params: { id, token, user_id } })
    },
    /**
     * List users
     */
    listUsers(id, token, first_name, last_name, email, page) {
        return api.get(constants.LIST_USERS, { params: { id, token, first_name, last_name, email, page } })
    },
    /**
     * Delete a user
     */
    deleteUser(id, token, user_id) {
        let formdata = new FormData()
        formdata.append('id', id)
        formdata.append('token', token)
        formdata.append('user_id', user_id)

        return api.post(constants.DELETE_USER, formdata)
    },
    /**
     * Change user status
     */
    changeStatusUser(id, token, person_id, status, type) {
        let formdata = new FormData()
        formdata.append('id', id)
        formdata.append('token', token)
        formdata.append('person_id', person_id)
        formdata.append('status', status)
        formdata.append('type', type)

        return api.post(constants.CHANGE_STATUS_USER, formdata)
    }
}
