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
     * list services
     */
    listServices(id, token, name, page) {
        return api.get(constants.LIST_SERVICES, { params: { id, token, name, page } })
    },
    /**
     * Show a service
     */
    showService(id, token, service_id) {
        return api.get(constants.SHOW_SERVICE, { params: { id, token, service_id } })
    },
    /**
     * Save a service
     */
    saveService(id, token, name, description, value, initial_datetime, final_datetime, status, category_id, user_id) {
        console.log('Params: ', id, token, name, description, value, initial_datetime, final_datetime, status, category_id, user_id)
        let formdata = new FormData()
        formdata.append('id', id)
        formdata.append('token', token)
        formdata.append('name', name)
        formdata.append('description', description)
        formdata.append('value', value)
        formdata.append('initial_datetime', initial_datetime)
        formdata.append('final_datetime', final_datetime)
        formdata.append('status', status)
        formdata.append('category_id', category_id)
        formdata.append('user_id', user_id)
        return api.post(constants.SAVE_SERVICE, formdata)
    },
    /**
     * Update a service
     */
    updateService(id, token, service_id,name, description, value, initial_datetime, final_datetime, status, category_id, user_id) {
        console.log('Parametros pro update: ', id, token, name, description, value, initial_datetime, final_datetime, status, category_id, user_id)
        let formdata = new FormData()
        formdata.append('id', id)
        formdata.append('token', token)
        formdata.append('service_id', service_id)
        formdata.append('name', name)
        formdata.append('description', description)
        formdata.append('value', value)
        formdata.append('initial_datetime', initial_datetime)
        formdata.append('final_datetime', final_datetime)
        formdata.append('status', status)
        formdata.append('category_id', category_id)
        formdata.append('user_id', user_id)
        return api.post(constants.UPDATE_SERVICE, formdata)
    },
    /**
     * Delete a service 
     */
    deleteService(id, token, service_id) {
        let formdata = new FormData()
        formdata.append('id', id)
        formdata.append('token', token)
        formdata.append('service_id', service_id)
        return api.post(constants.DELETE_SERVICE, formdata)
    },
    /**
     * Change the status service
     */
    changeStatusService(id, token, service_id, status) {
        let formdata = new FormData()
        formdata.append('id', id)
        formdata.append('token', token)
        formdata.append('service_id', service_id)
        formdata.append('status', status)
        return api.post(constants.CHANGE_STATUS_SERVICE, formdata)
    }
}