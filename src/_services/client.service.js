import { authHeader } from '../_helpers';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const clientService = {
    create,
    getAll,
    getById,
    update,
    delete: _delete
};

function getAll() {
    const client = new ApolloClient({
        uri: 'https://graphqlzero.almansi.me/api',
        cache: new InMemoryCache()
      });

     client.query({ query: gql`
        {
            user(id: 1) {
                posts {
                  data {
                    id
                    title
                  }
                }
              }
        }`
        })
    .then(result => console.log(result.data.user.posts));
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

function create(client) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(client)
    };

    return fetch(`https://jsonplaceholder.typicode.com/users`, requestOptions).then(handleResponse);
}

function update(client) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(client)
    };

    return fetch(`https://jsonplaceholder.typicode.com/users/${client.id}`, requestOptions).then(handleResponse);;
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
        // if (!response.ok) {
        //     if (response.status === 401) {
        //         // auto logout if 401 response returned from api
        //         // logout();
        //         window.location.reload(true);
        //     }

        //     const error = (data && data.message) || response.statusText;
        //     return Promise.reject(error);
        // }

        return data;
    });
}