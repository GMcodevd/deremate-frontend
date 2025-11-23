import React from 'react';
import ProductList from '../components/ProductList';

function AccesoriosPage(props) {

  const accesorios = props.products.filter(p=> p.category?.toLowerCase() === 'accesorio')

    return (
        <div className="page-section">
            <h5 className='section-title'>Acá podes encontrar el accesorio que buscás</h5>
            <ProductList products= {accesorios}></ProductList>
        </div>
    );
}

export default AccesoriosPage;