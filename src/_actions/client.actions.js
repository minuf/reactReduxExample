import { clientConstants } from '../_constants';
import { clientService } from '../_services';
import { alertActions } from './';

export const clientActions = {
    create,
    getAll,
    update,
    delete: _delete
};

function create(clientName) {
    return dispatch => {
        dispatch(request(clientName));

        clientService.create(clientName)
            .then(
                client => { 
                    dispatch(success(client));
                    dispatch(alertActions.success('Created successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(clientName) { return { type: clientConstants.CREATE_REQUEST, clientName } }
    function success(client) { return { type: clientConstants.CREATE_SUCCESS, client } }
    function failure(error) { return { type: clientConstants.CREATE_FAILURE, error } }
}

function update(client, clientName) {
    return dispatch => {
        dispatch(request(client));

        clientService.update(client, clientName)
            .then(
                client => { 
                    dispatch(success(client));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(client) { return { type: clientConstants.UPDATE_REQUEST, client } }
    function success(client) { return { type: clientConstants.UPDATE_SUCCESS, client } }
    function failure(error) { return { type: clientConstants.UPDATE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        clientService.getAll()
            .then(
                clients => dispatch(success(clients)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: clientConstants.GETALL_REQUEST } }
    function success(clients) { return { type: clientConstants.GETALL_SUCCESS, clients } }
    function failure(error) { return { type: clientConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        clientService.delete(id)
            .then(
                client => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: clientConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: clientConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: clientConstants.DELETE_FAILURE, id, error } }
}