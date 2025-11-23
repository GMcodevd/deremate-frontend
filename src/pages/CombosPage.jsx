import React from 'react';
import ProductList from '../components/ProductList';

function CombosPage(props) {
 const combos = props.products.filter(p=> p.category?.toLowerCase() === 'combo')

    return (
        <div className="page-section">
            <h3 className='section-title'>Acá podes encontrar los mejores combos</h3>
            <ProductList products= {combos}></ProductList>
        </div>
    );
}

export default CombosPage;