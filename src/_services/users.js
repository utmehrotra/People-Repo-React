import { commonConstants } from '../_constants/common';
const BASEURL = commonConstants.BASEURL;

export const userService = {
    getUsers,
    getUsersFromURL
};

function getUsers(query) {
    const requestOptions = {
        method: 'GET'
    };
    const queryParams = objToQueryString(query);
    return fetch(`${BASEURL}/api/people?${queryParams}`, requestOptions).then(handleResponse).then(users => {
        return users;
    });
}

function getUsersFromURL(url) {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(`${url}`, requestOptions).then(handleResponse).then(users => {
        return users;
    });
}

function objToQueryString(obj) {
    const keyValuePairs = [];
    for (const key in obj) {
        keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    return keyValuePairs.join('&');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}