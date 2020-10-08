import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { clientActions } from '../_actions';

function HomePage() {
    const clients = useSelector(state => state.clients);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clientActions.getAll());
    }, [dispatch]);

    function handleDeleteClient(id) {
        dispatch(clientActions.delete(id));
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h1>Hi {user.firstName}!</h1>
            <p>You're logged in with React Hooks!!</p>
            <h3>All registered clients:</h3>
            {clients.loading && <em>Loading clients...</em>}
            {clients.error && <span className="text-danger">ERROR: {clients.error}</span>}
            {clients.items &&
                <ul>
                    {clients.items.map((client, index) =>
                        <li key={client.id}>
                            {client.name}
                            {
                                client.deleting ? <em> - Deleting...</em>
                                : client.deleteError ? <span className="text-danger"> - ERROR: {client.deleteError}</span>
                                : <span> - <button onClick={() => handleDeleteClient(client.id)} className="text-primary">Delete</button></span>
                            }
                        </li>
                    )}
                </ul>
            }
            <p>
                <Link to="/login">Logout</Link>
            </p>
        </div>
    );
}

export { HomePage };