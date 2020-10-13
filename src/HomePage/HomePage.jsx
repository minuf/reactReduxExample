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

    function handleCreateClient() {
        var clientName = prompt("New Client name:", "Harry Potter");
        dispatch(clientActions.create(clientName));
    }

    function handleUpdateClient(client) {
        var clientName = prompt("New Client name:", "Harry Potter");
        dispatch(clientActions.update(client, clientName));
    }

    function handleDeleteClient(id) {
        dispatch(clientActions.delete(id));
    }

    function handleCreateProduct() {
        var productTitle = prompt("New Product name:", "Conga 8788");
        dispatch(productActions.create(productTitle));
    }

    function handleUpdateProduct(product) {
        var productTitle = prompt("New product name:", "Aspirador Conga")
        dispatch(productActions.update(product, productTitle));
    }

    function handleDeleteProduct(id) {
        dispatch(productActions.delete(id));
    }

    function handleTab(tab) {
        setSelectedTab(tab)
    }

    function clientsComponent(clients) {
        return(
            <div className="col-lg-10 offset-lg-1">
            <h3>All clients:</h3>
            
            {clients.error && <span className="text-danger">ERROR: {clients.error}</span>}
            {clients.loading ? <em>Loading clients...</em>
            : clients.creating ? <em> - Creating...</em>
                : <button onClick={() => handleCreateClient()} className="text-primary">NEW CLIENT</button>}
            {clients.items &&
                <ul>
                    {clients.items.map((client, index) =>
                        <li key={client.id}>
                            {client.name}
                            {
                                client.deleting ? <em> - Deleting...</em>
                                : client.updating ? <em> - Updating...</em>
                                : client.deleteError ? <span className="text-danger"> - ERROR: {client.deleteError}</span>
                                : <span> - 
                                    <button onClick={() => handleDeleteClient(client.id)} className="text-primary">Delete</button>
                                    <button onClick={() => handleUpdateClient(client)} className="text-primary">Update</button>
                                </span>
                            }
                        </li>
                    )}
                </ul>
            }
            <p>
                <Link to="/login">Logout</Link>
            </p>
                <span>Fetched from jsonPlaceHolder in json format</span>
        </div>
        );
    }

    function productsComponent(product) {
        return(
            <div className="col-lg-10 offset-lg-1">
            <h3>All products:</h3>
            
            {product.error && <span className="text-danger">ERROR: {clients.error}</span>}
            {product.loading ? <em>Loading products...</em>
                : <button onClick={() => handleCreateProduct()} className="text-primary">NEW PRODUCT</button>}
            {product.items &&
                <ul>
                    {product.items.map((product, index) =>
                        <li key={product.id}>
                            {product.title}
                            {
                                product.deleting ? <em> - Deleting...</em>
                                : product.updating ? <em> - Updating...</em>
                                : product.deleteError ? <span className="text-danger"> - ERROR: {product.deleteError}</span>
                                : <span> - 
                                    <button onClick={() => handleDeleteProduct(product.id)} className="text-primary">Delete</button>
                                    <button onClick={() => handleUpdateProduct(product)} className="text-primary">Update</button>
                                </span>
                            }
                        </li>
                    )}
                </ul>
            }
            <p>
                <Link to="/login">Logout</Link>
            </p>
            <span>Fetched from GraphQLZero in GraphQl format</span>

        </div>
        );
    }

    return (
        <div>
            <div className="col-lg-8 offset-lg-2">
                <h1>Hi {user.firstName}!</h1>
                <button onClick={() => handleTab(1)} className="text-primary">CLIENTS</button>
                <button onClick={() => handleTab(2)} className="text-primary">PRODUCTS</button>
            </div>
            {selectedTab === 1 ? clientsComponent(clients) : productsComponent(products)}

        </div>
    );
}

export { HomePage };