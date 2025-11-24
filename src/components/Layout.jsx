import React from 'react';
import Header from './Header.jsx';
import { Box, Toolbar } from '@mui/material';

function Layout(props) {
    return (
        <>
            {/* Header */}
            <Header handleChange={props.handleChange} />

            {/* Espaciador que reserva la altura del header */}
            <Toolbar />

            {/* Contenido principal */}
            <Box component="main" sx={{ mt: 0 }}>
                {props.children}
            </Box>
        </>
    );
}

export default Layout;
