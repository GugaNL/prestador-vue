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
     * list categories
     */
    listCategories(id, token, name, page) {
        return api.get(constants.LIST_CATEGORIES, { params: { id, token, name, page } })
    },
    /**
     * Delete a category 
     */
    deleteCategory(id, token, category_id) {
        let formdata = new FormData()
        formdata.append('id', id)
        formdata.append('token', token)
        formdata.append('category_id', category_id)
        return api.post(constants.DELETE_CATEGORY, formdata)
    },
    /**
     * Show a category
     */
    showCategory(id, token, category_id) {
        return api.get(constants.SHOW_CATEGORY, { params: { id, token, category_id } })
    },
    /**
     * Update a category
     */
    updateCategory(id, token, category_id, name, description) {
        let formdata = new FormData()
        formdata.append('id', id)
        formdata.append('token', token)
        formdata.append('category_id', category_id)
        formdata.append('name', name)
        formdata.append('description', description)
        return api.post(constants.UPDATE_CATEGORY, formdata)
    },
    /**
     * Save a category
     */
    saveCategory(id, token, name, description) {
        let formdata = new FormData()
        formdata.append('id', id)
        formdata.append('token', token)
        formdata.append('name', name)
        formdata.append('description', description)
        return api.post(constants.SAVE_CATEGORY, formdata)
    }
}