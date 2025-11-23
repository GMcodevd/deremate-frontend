import React from 'react';
import ProductList from '../components/ProductList';

function BusquedaUser({products = [], searchTerm = '' }) {
    return (

        <div className="page-section">

            <h3 className='section-title'>Resultados para: {searchTerm}</h3>
            <ProductList products={products}></ProductList>

        </div>

    );
}

export default BusquedaUser;