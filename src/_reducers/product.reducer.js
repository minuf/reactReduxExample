import { productConstants } from '../_constants';

export function products(state = {}, action) {
    switch (action.type) {
        case productConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case productConstants.GETALL_SUCCESS:
            return {
                items: action.products,
                lastId: parseInt(action.products[action.products.length - 1].id)
            };
        case productConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case productConstants.CREATE_REQUEST:
            return {
                ...state,
                creating: true
            };
        case productConstants.CREATE_SUCCESS:
            action.product.id = '' + (state.lastId + 1) + ''
            state.items.unshift(action.product)
            return {
                ...state,
                lastId: state.lastId + 1,
                creating: false
            };
        case productConstants.CREATE_FAILURE:
            return {
                ...state,
                error: action.error,
                creating: false
            };
        case productConstants.UPDATE_REQUEST:
            return {
                ...state,
                items: state.items.map(product =>
                    product.id === action.product.id
                        ? { ...product, updating: true }
                        : product
                )
            };
        case productConstants.UPDATE_SUCCESS:
            console.log(action);
            return {
                ...state,
                items: state.items.map(product =>
                    product.id === action.product.id
                        ? { ...product, title: action.product.title, updating: false }
                        : product
                )
            };
        case productConstants.UPDATE_FAILURE:
            return {
                error: action.error
            };
        case productConstants.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(client =>
                    client.id === action.id
                        ? { ...client, deleting: true }
                        : client
                )
            };
        case productConstants.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter(client => client.id !== action.id)
            };
        case productConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
            return {
                ...state,
                items: state.items.map(client => {
                    if (client.id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...clientCopy } = client;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...clientCopy, deleteError: action.error };
                    }

                    return client;
                })
            };
        default:
            return state
    }
}