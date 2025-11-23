import React from 'react';
import ProductList from '../components/ProductList';
import { Link } from 'react-router-dom';
import './DestacadosPage.css'
import { Typography } from '@mui/material';

function DestacadosPage({ products }) {
   const destacados = products.filter(p=> p.category?.toLowerCase() === 'destacado')

    return (
        <div className= 'destacados-home'>
            <h1 className='destacados-title'>Productos destacados</h1><br />
            <ProductList products= {destacados}></ProductList>
            <Link to={'/todos-los-productos'}>
                <h1 className="link-flecha">Ver todos los productos</h1>
            </Link>
        </div>
    );
}

export default DestacadosPage;