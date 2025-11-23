import { Box, Button, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createProduct, updateProduct } from '../api/mateService.js';
import { MenuItem } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function FormProducts(props) {
  const categories = ["mate", "termo", "bombilla", "combo", "accesorio", "destacado"];

  const getImageUrl = (image) => {
    if (!image) return null;

    // Si ya es URL completa (caso URL manual)
    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    // Caso filename guardado en la BD
    return `https://deremate-backend.onrender.com/uploads/${image}`;
  };

  const [product, setProduct] = useState({
    name: '',
    category: '',
    image: '', // url existente (cuando editás)
    description: '',
    price: 0,
    stock: 0
  });

  const [file, setFile] = useState(null); // archivo seleccionado por el usuario
  const [preview, setPreview] = useState(null); // url de preview (objectURL o image url existente)

  useEffect(() => {
    if (props.productEdit && Object.keys(props.productEdit).length > 0) {
      setProduct(props.productEdit);
      setPreview(getImageUrl(props.productEdit.image));
      setFile(null);
    } else {
      setProduct({
        name: '',
        category: '',
        image: '',
        description: '',
        price: 0,
        stock: 0
      });
      setFile(null);
      setPreview(null);
    }
  }, [props.productEdit, props.open]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selected = e.target.files && e.target.files[0];

    if (selected) {
      setFile(selected);
      const objectUrl = URL.createObjectURL(selected);
      setPreview(objectUrl); // preview directo del archivo nuevo
    } else {
      setFile(null);
      setPreview(getImageUrl(product.image)); // vuelve a la imagen existente
    }
  };


  // permitir quitar la imagen seleccionada y volver a la url existente (en edición)
  const handleRemoveSelectedFile = () => {
    if (preview && preview.startsWith('blob:')) {
      URL.revokeObjectURL(preview);
    }
    setFile(null);
    setPreview(getImageUrl(product.image) || null);
    // también limpiar input file (si querés forzar)
    const input = document.getElementById('product-image-input');
    if (input) input.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Armar FormData
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('category', product.category);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('stock', product.stock);

    // Si hay archivo nuevo, lo añadimos; si no, enviamos la url actual (para que el backend la use)
    if (file) {
      formData.append('imageFile', file); // nombre: imageFile (consistente con backend)
    } else if (product.image) {
      // enviamos la url actual para edición (el backend puede interpretarla)
      formData.append('imageUrl', product.image);
    }

    // Si estamos editando -> update
    if (product._id !== undefined) {
      // update espera (id, formData)
      updateProduct(product._id, formData)
        .then((response) => {
          if (response.data) {
            props.setProducts((prev) =>
              prev.map(p => p._id === product._id ? response.data.producto : p)
            );
            props.handleClose();
          }
        })
        .catch(err => {
          console.error(err);
          alert('Error al actualizar producto');
        });
    } else {
      // create espera (formData)
      createProduct(formData)
        .then((response) => {
          if (response.data) {
            props.setProducts((prev) => [...prev, response.data.producto]);
            props.handleClose();
          }
        })
        .catch((error) => {
          console.error(error);
          alert('Error al crear producto');
        });
    }
  };

  return (
    <Box>
      <Button variant='contained' onClick={props.handleClickOpen} sx={{ display: 'flex', textTransform: 'none', marginTop: 5 }}>
        Nuevo Producto
      </Button>

      <Dialog open={props.open} onClose={props.handleClose} fullWidth maxWidth="sm">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <DialogTitle id='alert-dialog-title'>
            {product._id ? 'Editar Producto' : 'Crear nuevo Producto'}
          </DialogTitle>

          <DialogContent>
            <TextField fullWidth label='Nombre' margin='normal' value={product.name} name='name' onChange={handleChange} required autoFocus />

            <TextField fullWidth select label='Categoría' margin='normal' value={product.category} name='category' onChange={handleChange} required>
              {categories.map((option) => (
                <MenuItem key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </MenuItem>
              ))}
            </TextField>

            {/* Input de archivo */}
            <Box sx={{ mt: 1, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <input
                id="product-image-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'block' }}
              />
              {file && (
                <IconButton aria-label="remove" onClick={handleRemoveSelectedFile} title="Quitar imagen seleccionada">
                  <CloseIcon />
                </IconButton>
              )}
            </Box>

            {/* Preview */}
            {preview && (
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                <img src={preview} alt="preview" style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8 }} />
                <Box>
                  <div style={{ fontSize: 12, color: '#666' }}>{file ? file.name : 'Imagen actual'}</div>
                  {file && <div style={{ fontSize: 12, color: '#666' }}>Tamaño: {(file.size / 1024).toFixed(0)} KB</div>}
                </Box>
              </Box>
            )}

            <TextField fullWidth label='Precio' margin='normal' value={product.price} name='price' onChange={handleChange} required />

            <TextField fullWidth label='Stock' margin="dense" value={product.stock} name='stock' onChange={handleChange} required />

            <TextField fullWidth label='Descripción' margin='normal' value={product.description} name='description' onChange={handleChange} multiline rows={5} />
          </DialogContent>

          <DialogActions>
            <Button onClick={props.handleClose} sx={{ textTransform: 'none' }}>Cancelar</Button>
            <Button type="submit" autoFocus sx={{ textTransform: 'none' }}>
              Guardar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

export default FormProducts;
