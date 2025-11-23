import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { WhatsApp, Facebook, Instagram } from "@mui/icons-material";

export default function Contacto() {
    return (
        <section className="page-section" id="contacto">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    width: "100%",
                    minHeight: "100vh",
                    px: 3,
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: "bold",
                        mb: 2,
                        color: "inherit",
                    }}
                >
                    ¡Contactate con nosotros!
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        maxWidth: "600px",
                        mb: 4,
                        color: "inherit",
                        opacity: 0.9,
                    }}
                >
                    Si querés hacer consultas, o ver más publicaciones,
                    podés seguirnos en nuestras redes sociales. ¡Siempre hay novedades y promociones exclusivas!
                </Typography>

                <Box>
                    <IconButton
                        aria-label="Facebook"
                        href="https://www.facebook.com"
                        target="_blank"
                        sx={{
                            color: "#1f00ccff",
                            mx: 1,
                            transition: "transform 0.3s ease, color 0.3s ease",
                            "&:hover": {
                                color: "#9267ffff",
                                transform: "scale(1.2)",
                            }
                        }}
                    >
                        <Facebook sx={{ fontSize: 40 }} />
                    </IconButton>

                    <IconButton
                        aria-label="Instagram"
                        href="https://www.instagram.com"
                        target="_blank"
                        sx={{ color: "#c4477bff",
                            mx: 1,
                            transition: "transform 0.3s ease, color 0.3s ease",
                            "&:hover": {
                                color: "#b9b9b9ff",
                                transform: "scale(1.2)",
                            }}}
                    >
                        <Instagram sx={{ fontSize: 40 }} />
                    </IconButton>

                    <IconButton
                        aria-label="WhatsApp"
                        href="https://wa.me/549XXXXXXXXXX"
                        target="_blank"
                        sx={{ color: "#22c022ff",
                            mx: 1,
                            transition: "transform 0.3s ease, color 0.3s ease",
                            "&:hover": {
                                color: "#6ffd7bda",
                                transform: "scale(1.2)",
                            } }}
                    >
                        <WhatsApp sx={{ fontSize: 40 }} />
                    </IconButton>
                </Box>
            </Box>
        </section >
    );
}
