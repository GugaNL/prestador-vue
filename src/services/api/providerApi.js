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
    * Register provider by admin
    */
    registerProvider(id, token, provider_image, first_name, last_name, email, phone,
        zip_code, address_street, address_number, address_neighborhood, address_complement,
        address_reference, address_city, address_state) {
        let formdata = new FormData()
        formdata.append('id', id)
        formdata.append('token', token)
        //formdata.append('provider_image', provider_image)
        formdata.append('first_name', first_name)
        formdata.append('last_name', last_name)
        formdata.append('email', email)
        formdata.append('zip_code', zip_code)
        formdata.append('address_street', address_street)
        formdata.append('address_number', address_number)
        formdata.append('address_neighborhood', address_neighborhood)
        formdata.append('address_complement', address_complement)
        formdata.append('address_reference', address_reference)
        formdata.append('address_city', address_city)
        formdata.append('address_state', address_state)

        return api.post(constants.REGISTER_PROVIDER_BY_ADMIN, formdata)
    },

    /**
     * Update a provider
     */
    updateProvider(id, token, provider_id, first_name, last_name, email, phone, zip_code, 
        address_street, address_number, address_neighborhood, address_complement, address_reference,
        address_city, address_state) {
        console.log('parametros: ', id, token, provider_id, first_name, last_name, email, phone, zip_code, 
        address_street, address_number, address_neighborhood, address_complement, address_reference,
        address_city, address_state)
        let formdata = new FormData()
        formdata.append('id', id)
        formdata.append('token', token)
        formdata.append('provider_id', provider_id)
        formdata.append('first_name', first_name)
        formdata.append('last_name', last_name)
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

        return api.post(constants.UPDATE_PROVIDER_BY_ADMIN, formdata)
    },

    /**
     * List providers
     */
    listProviders(id, token) {
        return api.get(constants.LIST_PROVIDERS, { params: { id, token } })
    },

    /**
     * Delete a provider
     */
    deleteProvider(id, token, provider_id) {
        let formdata = new FormData()
        formdata.append('id', id)
        formdata.append('token', token)
        formdata.append('provider_id', provider_id)

        return api.post(constants.DELETE_PROVIDER, formdata)
    },

    /**
     * Change provider status
     */
    changeStatusProvider(id, token, person_id, status, type) {
        let formdata = new FormData()
        formdata.append('id', id)
        formdata.append('token', token)
        formdata.append('person_id', person_id)
        formdata.append('status', status)
        formdata.append('type', type)

        return api.post(constants.CHANGE_STATUS_PROVIDER, formdata)
    },

    /**
     * Show a provider
     */
    showProvider(id, token, provider_id) {
        return api.get(constants.SHOW_PROVIDER_BY_ADMIN, { params: { id, token, provider_id } })
    },
}