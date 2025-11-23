import React from 'react';
import ProductList from '../components/ProductList';

function TodosLosProductos({products}) {
    return (
        <div className="page-section">
            <h3 className='section-title'>Acá podes encontrar todos los productos</h3>
            <ProductList products= {products}></ProductList>
        </div>
    );
}

export default TodosLosProductos;