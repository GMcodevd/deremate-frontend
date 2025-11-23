import React from 'react';
import ProductList from '../components/ProductList';

function MatesPage(props) {

    const mates = props.products.filter(p=> p.category?.toLowerCase() === 'mate')

    return (
        <div className="page-section">
            <h3 className='section-title'>Acá podes encontrar el mate que buscás</h3>
            <ProductList products= {mates}></ProductList>
        </div>
    );
}

export default MatesPage;