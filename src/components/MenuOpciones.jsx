import React from 'react';
import { Box, Typography, Container } from "@mui/material";
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";

function MenuOpciones() {

    const navigate = useNavigate();

    const opciones = [
        { titulo: "Mates", img: "/mates.png", link: "/mates" },
        { titulo: "Termos", img: "/termos.png", link: "/termos" },
        { titulo: "Bombillas", img: "/bombillas.png", link: "/bombillas" },
        { titulo: "Accesorios", img: "/accesorios.png", link: "/accesorios" },
        { titulo: "Combos", img: "/combos.png", link: "/combos" },
        { titulo: "Todos los productos", img: "/todos-los-productos.png", link: "/todos-los-productos" }
    ];

    return (

        <Grid container spacing={1.5} mr={1} ml={1}>
            {opciones.map((op, i) => (
                <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
                    <Box
                        onClick={() => navigate(op.link)}
                        sx={{
                            position: "relative",
                            height: 350,
                            borderRadius: 2,
                            cursor: "pointer",
                            width: "100%",
                            overflow: "hidden",
                            backgroundRepeat: "no-repeat",
                            backgroundImage: `url(${op.img})`,
                            backgroundSize: { xs: 'cover', md: 'contain' }, //pantallas grandes y móviles
                            bgcolor: '#1a1a1a',
                            backgroundPosition: "center",
                            transition: "transform 0.3s, filter 0.3s",
                            "&:hover": {
                                transform: "scale(1.03)",
                                filter: "brightness(1.1)",
                            },
                        }}
                    >
                        <Box
                            sx={{
                                position: "absolute",
                                bottom: 0,
                                width: "100%",
                                bgcolor: "rgba(0,0,0,0.5)",
                                color: "white",
                                textAlign: "center",
                                py: 2,
                            }}
                        >
                            <Typography variant="h6">{op.titulo}</Typography>
                        </Box>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
};

export default MenuOpciones;