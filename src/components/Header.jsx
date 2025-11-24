import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Box,
    Avatar,
    Button,
    TextField,
    InputAdornment,
    IconButton,
    Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from './context/AuthContext.jsx';

function Header(props) {
    const location = useLocation();
    const isHome = location.pathname === '/';
    const navigate = useNavigate();

    const { isUserLogged, logout } = useAuth();
    const [search, setSearch] = useState('');

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleClick = () => {
        props.handleChange(search);
        navigate("/busqueda");
    };

    const buttons = [
        { label: 'Mates', to: '/mates' },
        { label: 'Bombillas', to: '/bombillas' },
        { label: 'Termos', to: '/termos' },
        { label: 'Combos', to: '/combos' },
        { label: 'Accesorios', to: '/accesorios' },
        { label: 'Contacto', to: '/contacto' },
    ];

    return (
        <AppBar
            position="absolute"
            elevation={0}
            sx={{
                backgroundColor: isHome ? 'transparent' : 'rgba(15, 15, 15, 0.95)',
                boxShadow: isHome ? 'none' : '0px 2px 4px rgba(0,0,0,0.2)',
            }}
        >
            <Toolbar sx={{ flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: 1 }}>
                {/* Logo */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: { xs: 0, sm: 1 }, gap: 1 }}>
                    <Link to="/">
                        <Avatar sx={{ height: { xs: 60, sm: 90 }, width: { xs: 60, sm: 90 } }} src="/logo-deremate-2025.png" />
                    </Link>
                </Box>

                {/* Botones de navegación */}
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: { xs: 'center', sm: 'flex-start' },
                        gap: 1,
                        flexGrow: 1,
                    }}
                >
                    {buttons.map((btn) => (
                        <Button
                            key={btn.label}
                            component={Link}
                            to={btn.to}
                            sx={{
                                color: 'white',
                                textTransform: 'none',
                                fontSize: { xs: 12, sm: 15 },
                                flex: { xs: '1 1 45%', sm: '0 0 auto' },
                                '&:hover': {
                                    backgroundColor: isHome
                                        ? 'rgba(255, 255, 255, 0.25)'
                                        : 'rgba(255, 255, 255, 0.15)',
                                },
                            }}
                        >
                            {btn.label}
                        </Button>
                    ))}

                    {isUserLogged && (
                        <Button
                            onClick={handleLogout}
                            sx={{
                                color: 'white',
                                textTransform: 'none',
                                fontSize: { xs: 12, sm: 15 },
                                flex: { xs: '1 1 45%', sm: '0 0 auto' },
                                '&:hover': {
                                    backgroundColor: isHome
                                        ? 'rgba(255, 255, 255, 0.25)'
                                        : 'rgba(255, 255, 255, 0.15)',
                                },
                            }}
                        >
                            Cerrar sesión
                        </Button>
                    )}
                </Box>

                {/* Buscador */}
                <Box sx={{ mt: { xs: 1, sm: 0 }, width: { xs: '100%', sm: 'auto' }, flexGrow: { xs: 0, sm: 0 } }}>
                    <TextField
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar Productos..."
                        size="small"
                        fullWidth
                        sx={{
                            backgroundColor: isHome ? '#ffffff8f' : '#2a2a2a',
                            '& input': { color: isHome ? 'black' : 'white' },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end" sx={{ cursor: 'pointer' }} onClick={handleClick}>
                                    <SearchIcon sx={{ color: isHome ? 'white' : '#cccccc' }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
