import { clientConstants } from '../_constants';

export function clients(state = {}, action) {
    switch (action.type) {
        case clientConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case clientConstants.GETALL_SUCCESS:
            return {
                items: action.clients
            };
        case clientConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case clientConstants.UPDATE_REQUEST:
            return {
                ...state,
                items: state.items.map(client =>
                    client.id === action.client.id
                        ? { ...client, updating: true }
                        : client
                )
            };
        case clientConstants.UPDATE_SUCCESS:
            return {
                ...state,
                items: state.items.map(client =>
                    client.id === action.client.id
                        ? { ...client, name: action.client.name, updating: false }
                        : client
                )
            };
        case clientConstants.UPDATE_FAILURE:
            return {
                error: action.error
            };
        case clientConstants.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(client =>
                    client.id === action.id
                        ? { ...client, deleting: true }
                        : client
                )
            };
        case clientConstants.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter(client => client.id !== action.id)
            };
        case clientConstants.DELETE_FAILURE:
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