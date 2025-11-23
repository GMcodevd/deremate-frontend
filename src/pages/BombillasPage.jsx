import React from 'react';
import ProductList from '../components/ProductList';

function BombillasPage(props) {
  const bombillas = props.products.filter(p=> p.category?.toLowerCase() === 'bombilla')

    return (
        <div className="page-section">
            <h3 className='section-title'>Acá podes encontrar la bombilla que buscás</h3>
            <ProductList products= {bombillas}></ProductList>
        </div>
    );
}

export default BombillasPage;