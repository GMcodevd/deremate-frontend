import React from 'react';
import { Paper, Typography, Box, IconButton, Avatar, Tooltip } from '@mui/material';
import { Facebook, Instagram, WhatsApp } from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Footer() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        if (location.pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            navigate("/");
        }
    };



    return (
        <Paper
            component="footer"
            square
            elevation={0}
            sx={{
                backgroundColor: "#111111ee",
                color: "white",
                width: "100%",
                py: 3,
                px: 5,
                mt: "auto",
                borderRadius: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
            }}
        >
            {/* Contenedor principal (logo + redes) */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    maxWidth: "900px",
                }}
            >
                {/* Logo a la izquierda */}
                <Box sx={{ display: "flex", alignItems: "center", alignContent: 'center', justifyContent: 'center' }}>
                    <Link to={'/'} onClick={handleClick}>
                        <Tooltip title="Volver al inicio">
                            <Avatar sx={{
                                height: 140, width: 140, transition: "transform 0.3s, color 0.3s",
                                "&:hover": { transform: "scale(1.2)" }
                            }} src='\public\logo-deremate-sin-fondo.png'></Avatar>
                        </Tooltip>
                    </Link>
                </Box>

                {/* Redes a la derecha (en columna) */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1.5,
                    }}
                >
                    <Typography variant='h7' sx={{ color: '#cecece', mt: 3 }}>
                        Nuestras redes sociales
                    </Typography>

                    <IconButton
                        aria-label="Facebook"
                        href="https://www.facebook.com"
                        target="_blank"
                        sx={{
                            color: "#cecece",
                            transition: "transform 0.3s, color 0.3s",
                            "&:hover": { color: "#d4af37", transform: "scale(1.2)" },
                        }}
                    >
                        <Facebook /><span style={{ fontSize: 15 }}>Facebook</span>
                    </IconButton>

                    <IconButton
                        aria-label="Instagram"
                        href="https://www.instagram.com"
                        target="_blank"
                        sx={{
                            color: "#cecece",
                            transition: "transform 0.3s, color 0.3s",
                            "&:hover": { color: "#d4af37", transform: "scale(1.2)" },
                        }}
                    >
                        <Instagram /><span style={{ fontSize: 15 }}>Instagram</span>
                    </IconButton>

                    <IconButton
                        aria-label="WhatsApp"
                        href="https://wa.me/549XXXXXXXXXX"
                        target="_blank"
                        sx={{
                            color: "#cecece",
                            transition: "transform 0.3s, color 0.3s",
                            "&:hover": { color: "#d4af37", transform: "scale(1.2)" },
                        }}
                    >
                        <WhatsApp /><span style={{ fontSize: 15 }}>WhatsApp</span>
                    </IconButton>
                </Box>
            </Box>

            {/* Texto inferior */}
            <Typography
                variant="body2"
                sx={{ color: "white", opacity: 0.7, textAlign: "center", mt: 2 }}
            >
                © 2025 DereMate — Todos los derechos reservados
            </Typography>
        </Paper>
    );
}

export default Footer;
