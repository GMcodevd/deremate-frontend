import React from 'react';
import ProductList from '../components/ProductList';

function TermosPage(props) {
  const termos = props.products.filter(p=> p.category?.toLowerCase() === 'termo')

    return (
        <div className="page-section">
            <h3 className='section-title'>Acá podes encontrar el termo que buscás</h3>
            <ProductList products= {termos}></ProductList>
        </div>
    );
}


export default TermosPage;