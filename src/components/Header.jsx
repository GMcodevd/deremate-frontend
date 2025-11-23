import React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Button, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'; //Para manejar estilos según la ruta
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";



function Header(props) {
    const location = useLocation();
    const isHome = location.pathname === '/';

    const navigate = useNavigate()

    const [search, setSearch] = useState('');

    const { isUserLogged, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleClick = () => {
        props.handleChange(search)
        navigate("/busqueda");
    }

    return (
        <AppBar position="absolute"
            elevation={0}
            sx={{
                backgroundColor: isHome ? 'transparent' : 'rgba(15, 15, 15, 0.95)',
                boxShadow: isHome ? 'none' : '0px 2px 4px rgba(0,0,0,0.2)',
            }}>
            <Toolbar>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 1, width: '100%' }}>

                        {/*Logo + marca*/}
                        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, gap: 1 }}>
                            <Link to={'/'}>
                                <Avatar sx={{ height: 90, width: 90 }} src='/logo.png'></Avatar>
                            </Link>
                            <Button component={Link} to={'/mates'} sx={{
                                color: 'white', textTransform: 'none', fontSize: 15, marginLeft: 6,
                                '&:hover': {
                                    backgroundColor: isHome
                                        ? 'rgba(255, 255, 255, 0.25)'
                                        : 'rgba(255, 255, 255, 0.15)'
                                }
                            }}>
                                Mates
                            </Button>

                            <Button component={Link} to={'/bombillas'} sx={{
                                color: 'white', textTransform: 'none', fontSize: 15, '&:hover': {
                                    backgroundColor: isHome
                                        ? 'rgba(255, 255, 255, 0.25)'
                                        : 'rgba(255, 255, 255, 0.15)'
                                }
                            }}>

                                Bombillas

                            </Button>

                            <Button component={Link} to={'/termos'} sx={{
                                color: 'white', textTransform: 'none', fontSize: 15, '&:hover': {
                                    backgroundColor: isHome
                                        ? 'rgba(255, 255, 255, 0.25)'
                                        : 'rgba(255, 255, 255, 0.15)'
                                }
                            }}>

                                Termos

                            </Button>

                            <Button component={Link} to={'/combos'} sx={{
                                color: 'white', textTransform: 'none', fontSize: 15, '&:hover': {
                                    backgroundColor: isHome
                                        ? 'rgba(255, 255, 255, 0.25)'
                                        : 'rgba(255, 255, 255, 0.15)'
                                }
                            }}>

                                Combos

                            </Button>

                            <Button component={Link} to={'/accesorios'} sx={{
                                color: 'white', textTransform: 'none', fontSize: 15, '&:hover': {
                                    backgroundColor: isHome
                                        ? 'rgba(255, 255, 255, 0.25)'
                                        : 'rgba(255, 255, 255, 0.15)'
                                }
                            }}>

                                Accesorios

                            </Button>

                            <Button component={Link} to={'/contacto'} sx={{
                                color: 'white', textTransform: 'none', fontSize: 15, '&:hover': {
                                    backgroundColor: isHome
                                        ? 'rgba(255, 255, 255, 0.25)'
                                        : 'rgba(255, 255, 255, 0.15)'
                                }
                            }}>

                                Contacto

                            </Button>

                            {isUserLogged && (
                                <Button
                                    onClick={handleLogout}
                                    sx={{
                                        color: 'white',
                                        textTransform: 'none',
                                        fontSize: 15,
                                        marginLeft: 2,
                                        '&:hover': {
                                            backgroundColor: isHome
                                                ? 'rgba(255, 255, 255, 0.25)'
                                                : 'rgba(255, 255, 255, 0.15)'
                                        }
                                    }}
                                >
                                    Cerrar sesión
                                </Button>
                            )}

                        </Box>

                        {/*Buscador + Button*/}
                        {/* Buscador con icono */}
                        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', mr: 5 }}>
                            <TextField
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Buscar Productos..."
                                size="small"
                                sx={{ flex: 1, backgroundColor: isHome ? "#ffffff8f" : "#2a2a2a", maxWidth: 220, ml: 3, height: 36, alignContent: 'center', justifyContent: 'center', '& input': { color: isHome ? 'black' : 'white', }, }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end" sx={{ cursor: 'pointer' }} onClick={handleClick}>
                                            <SearchIcon sx={{ color: isHome ? 'white' : '#cccccc' }} />
                                        </InputAdornment>
                                    ),
                                }}>
                            </TextField>
                            <Typography>

                            </Typography>


                        </Box>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar >
    );
}


export default Header;