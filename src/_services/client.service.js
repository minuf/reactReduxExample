import { authHeader } from '../_helpers';

export const clientService = {
    create,
    getAll,
    getById,
    update,
    delete: _delete
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`https://jsonplaceholder.typicode.com/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`https://jsonplaceholder.typicode.com/users/${id}`, requestOptions).then(handleResponse);
}

function create(clientName) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: `{"name": "${clientName}"}`
    };

    return fetch(`https://jsonplaceholder.typicode.com/users`, requestOptions).then(handleResponse);
}

function update(client, clientName) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: `{"id": ${client.id}, "name": "${clientName}"}`
    };

    return fetch(`https://jsonplaceholder.typicode.com/users/${client.id}`, requestOptions).then(response => {
        if (response.status === 500) { // this is because in jsonplaceholder/users dont accept id that not exists (only has 10)
            client.name = clientName;
            return client;
        }
        handleResponse(response);
    });;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`https://jsonplaceholder.typicode.com/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log(data);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}