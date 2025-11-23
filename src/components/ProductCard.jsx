import React from 'react';
import { Card, CardContent, Typography, Box, Modal, Button } from '@mui/material';
import { useState } from "react";


function ProductCard({ products }) {

  const [open, setOpen] = useState(false);

  // Función para abrir WhatsApp con mensaje dinámico
  const handleWhatsApp = () => {
    const phoneNumber = '5493455461825'; // el número real
    const message = `Hola! Estoy interesado en el producto "${products.name}". ¿Podrías darme más información?`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <Card
        sx={{
          width: 240,
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          backgroundColor: '#fff',
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
          },
        }}
      >
        {/* Imagen del producto */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 180,
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src={
              products.image
                ? products.image
                : 'https://cdn-icons-png.flaticon.com/512/11542/11542598.png'
            }
            alt={products.name}
            onClick={() => setOpen(true)}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
              '&:hover': {
                transform: 'scale(1.08)',
              },
            }}
          />
        </Box>

        {/* Contenido */}
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              mb: 0.5,
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {products.name || 'Producto sin nombre'}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
            {products.category || 'Sin categoría'}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              height: 36,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {products.description || 'Sin descripción disponible'}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 1.5,
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#2B8600' }}>
              ${products.price ?? 0}
            </Typography>

            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Stock: {products.stock ?? 'N/A'}
            </Typography>
          </Box>

          {/* Botón de WhatsApp */}
          <Button
            variant="contained"
            size="small"
            onClick={handleWhatsApp}
            sx={{
              mt: 2,
              backgroundColor: '#25D366',
              color: 'white',
              fontWeight: 600,
              textTransform: 'none',
              width: '100%',
              '&:hover': {
                backgroundColor: '#1DA851',
              },
            }}
          >
            Consultar por WhatsApp
          </Button>


        </CardContent>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          onClick={() => setOpen(false)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            bgcolor: "rgba(0,0,0,0.8)",
          }}
        >
          <img
            onClick={(e) => e.stopPropagation()}
            src={
              products.image?.startsWith('http')
                ? products.image
                : `${import.meta.env.VITE_API_URL}/${products.image}`
            }
            alt={products.name}
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              borderRadius: '10px',
            }}
          />
        </Box>
      </Modal>
    </>


  );
}

export default ProductCard;
