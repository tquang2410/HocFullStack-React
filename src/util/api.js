import axios from './axios.customize.js';
const createUserApi = (name, email, password) => {
    const URL_API = '/v1/api/register';
    const data = {
        name: name,
        email: email,
        password: password
    };
    return axios.post(URL_API, data)
}
export {
    createUserApi
}