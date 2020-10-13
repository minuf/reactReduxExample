import { authHeader } from '../_helpers';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const productService = {
    create,
    getAll,
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
.then(result => {
  return JSON.parse(JSON.stringify(result.data.posts.data));;
});
}

function create(productTitle) {
    return client.mutate({mutation: gql `
    mutation {
        createPost(input: {title: "${productTitle}", body: ""}) {
          id
          title
          body
        }
      }
    `})
    
.then(result => result.data.createPost);
}

function update(product, productTitle) {
  console.log("TITLEEEE: " + productTitle)
    return client.mutate({mutation: gql `
    mutation {
        updatePost(id: ${product.id}, input: {title: "${productTitle}"}) {
          id
          title
        }
      }
    `})
    
.then(result => {
  if (result.status === 500) { // this is because in jsonplaceholder/products dont accept id that not exists (only has 100)
    product.title = productTitle;
    return product;
  }
  return result.data.updatePost
  });
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return client.mutate({mutation: gql `
        mutation  {
            deletePost(id: ${id})
          }
    `})
    
.then(result => console.log(result));
}