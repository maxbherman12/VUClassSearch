import axios from 'axios'

import { getBaseUrlClient } from './getBaseUrlClient'

export const api = axios.create({
    baseURL: getBaseUrlClient(),
    withCredentials: true
})
