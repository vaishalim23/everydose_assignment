import axios from 'axios';

const baseURL='https://jsonplaceholder.typicode.com';

export function getItems(){
    return axios.get(`${baseURL}/../../data.json`);
}