import { authHeader } from '../_helpers';
import { ApolloClient, InMemoryCache, gql, useMutation } from '@apollo/client';

export const productService = {
    create,
    getAll,
    getById,
    update,
    delete: _delete
};

const client = new ApolloClient({
    uri: 'https://graphqlzero.almansi.me/api',
    cache: new InMemoryCache()
  });


function getAll() {

 return client.query({ query: gql`
    {
        posts(options: {paginate: {limit: 10}}) {
            data {
              id
              title
            }
            meta {
              totalCount
            }
          }
    }`
    })
.then(result => result.data.posts.data);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, requestOptions).then(handleResponse);
}

function create(product) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    };

    return fetch(`https://jsonplaceholder.typicode.com/posts`, requestOptions).then(handleResponse);
}

function update(product) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    };

    return fetch(`https://jsonplaceholder.typicode.com/posts/${product.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return client.mutate({mutation: gql `
        mutation  {
            deletePost(id: 1)
          }
    `})
    
.then(result => console.log("RESUUUUULLLLLTTTT: " + result));
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
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