import axios from 'axios'

export const api = axios.create({
    baseURL: "https://vuclasssearch.herokuapp.com",
    withCredentials: true
})
