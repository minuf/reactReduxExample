import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { clientActions, productActions } from '../_actions';

function HomePage() {
    const [selectedTab, setSelectedTab] = useState(1);

    const clients = useSelector(state => state.clients);
    const products = useSelector(state => state.products);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clientActions.getAll());
        dispatch(productActions.getAll());
    }, [dispatch]);

    function handleDeleteClient(id) {
        dispatch(clientActions.delete(id));
    }

    function handleDeleteProduct(id) {
        dispatch(productActions.delete(id));
    }

    function handleTab(tab) {
        setSelectedTab(tab)
    }

    function clientsComponent(clients) {
        return(
            <div className="col-lg-8 offset-lg-2">
            <h3>All clients:</h3>
            
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

    function productsComponent(product) {
        return(
            <div className="col-lg-8 offset-lg-2">
            <h3>All products:</h3>
            
            {product.loading && <em>Loading products...</em>}
            {product.error && <span className="text-danger">ERROR: {clients.error}</span>}
            {product.items &&
                <ul>
                    {product.items.map((product, index) =>
                        <li key={product.id}>
                            {product.title}
                            {
                                product.deleting ? <em> - Deleting...</em>
                                : product.deleteError ? <span className="text-danger"> - ERROR: {product.deleteError}</span>
                                : <span> - <button onClick={() => handleDeleteProduct(product.id)} className="text-primary">Delete</button></span>
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

    return (
        <div>
            <h1>Hi {user.firstName}!</h1>
            <button onClick={() => handleTab(1)} className="text-primary">CLIENTS</button>
            <button onClick={() => handleTab(2)} className="text-primary">PRODUCTS</button>
            {selectedTab === 1 ? clientsComponent(clients) : productsComponent(products)}

        </div>
    );
}

export { HomePage };