import { productConstants } from '../_constants';

export function products(state = {}, action) {
    switch (action.type) {
        case productConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case productConstants.GETALL_SUCCESS:
            return {
                items: action.products
            };
        case productConstants.GETALL_FAILURE:
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