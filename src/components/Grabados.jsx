import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './Slider.css'

export default function Grabados() {
    const slides = [
        { src: "/mategrabado1.png", title: "A pedido del cliente" },
        { src: "/mategrabado2.png", title: "Ofertas imperdibles" },
        { src: "/mategrabado3.png", title: "Ideal para vos o regalar" },
    ];

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                height: "100vh",
                overflow: "hidden",
            }}
            className='slider-container'>

            <Swiper
                modules={[Navigation, Pagination]}
                navigation
                loop
                pagination={{ clickable: true }}
                style={{ height: "100%", width: "100%", padding: 0, margin: 0 }}
            >
                {slides.map((slide, i) => (
                    <SwiperSlide key={i}>
                        <Box
                            sx={{
                                position: "relative",
                                height: "100%",
                                width: "100%",
                                backgroundImage: `url(${slide.src})`,
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: { xs: 'cover', md: 'contain' }, //pantallas grandes y móviles
                                bgcolor: '#1a1a1a',
                                ackgroundRepeat: "no-repeat",
                            }}
                        >
                            {/* Overlay oscuro */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    bgcolor: "rgba(0, 0, 0, 0.3)",
                                }}
                            />


                            {/* Texto sobre la imagen */}
                            <Box>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        position: "absolute",
                                        top: "5%",
                                        left: "3%",
                                        color: "white",
                                        fontWeight: "bold",
                                        textShadow: "2px 2px 10px rgba(0,0,0,0.8)",
                                    }}
                                >
                                    Grabados personalizados
                                </Typography>
                                <Box
                                    sx={{
                                        position: "absolute",
                                        bottom: "20%",
                                        left: "10%",
                                        color: "white",
                                        textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
                                    }}
                                >
                                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                                        {slide.title}
                                    </Typography>
                                    <Typography variant="h6">DeRemate.com</Typography>

                                </Box>
                            </Box>
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
}