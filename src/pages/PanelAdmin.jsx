import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Container, Box, IconButton } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import FormProducts from '../components/FormProducts.jsx';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Edit';
import { removeProduct } from '../api/mateService.js';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';

function PanelPage({ products, setProducts }) {

    const API_BASE_URL = import.meta.env.VITE_API_URL;


    const getImageUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path; // por si algún producto viejo tenía URL completa
        return `${API_BASE_URL}${path}`; // agrega el dominio del backend
    };



    // const [load, setLoad] = useState(false);
    const [open, setOpen] = useState(false); //Control del popup
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false) //Abrir dialogo de confirmación
    const [idProductToDelete, setidProductToDelete] = useState(null) // Eliminar producto definitivamente
    const [productEdit, setProductEdit] = useState({
        name: '',
        category: '',
        image: '',
        description: '',
        price: 0,
        stock: 0

    })

    const handleClickOpen = () => {
        setProductEdit({
            name: '',
            category: '',
            image: '',
            description: '',
            price: 0,
            stock: 0
        })
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false)
    }


    const handleDelete = () => {
        setOpenConfirmDelete(true)
    }

    const takeId = (idDelete) => {
        setidProductToDelete(idDelete)
        handleDelete()
    }

    const handleCloseDelete = () => {
        setOpenConfirmDelete(false)
        setidProductToDelete(null)
    }

    const handleRemoveItem = async () => {
        if (!idProductToDelete) return;

        console.log("Intentando eliminar producto con ID:", idProductToDelete);

        try {
            const response = await removeProduct(idProductToDelete);
            console.log("Respuesta del servidor:", response);

            setProducts(prev => prev.filter(p => p._id !== idProductToDelete));

        } catch (error) {
            console.error("Error al eliminar producto:", error);
            alert("No se pudo eliminar el producto.");
        } finally {
            handleCloseDelete();
        }
    };

    const handleUpdateItem = (item) => {
        setProductEdit(item)
        setOpen(true)
    }


    return (
        <Container sx={{ mt: 12 }}>

            {/* <Box sx={{ display: 'flex' }} justifyContent='center'>
                <CircularProgress />
            </Box> */}

            <>
                <FormProducts handleClose={handleClose} handleClickOpen={handleClickOpen} open={open}
                    productEdit={productEdit} setProducts={setProducts}></FormProducts>
                <br></br>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 600 }}>Imagen</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Nombre</TableCell>
                                <TableCell sx={{ fontWeight: 600 }} align="right">Precio</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 600 }}>Categoría</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 600 }}>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((row) => (
                                <TableRow key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="right">
                                        <Avatar src={getImageUrl(row.image)}>
                                        </Avatar>
                                    </TableCell>

                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>

                                    <TableCell align="right">${row.price}</TableCell>
                                    <TableCell align="right">{row.category}</TableCell>
                                    <TableCell align="right">
                                        <IconButton color='inherit' aria-label='Editar' onClick={() => handleUpdateItem(row)}>
                                            <UpdateIcon></UpdateIcon>
                                        </IconButton>

                                        <IconButton color='inherit' aria-label='Eliminar' onClick={() => takeId(row._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>


                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>



            <Dialog open={openConfirmDelete}
                onClose={handleCloseDelete} aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title" color="error">
                    {"¿Eliminar producto?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Esta acción no se puede deshacer. ¿Estás seguro de que querés eliminar este producto?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDelete}>Cancelar</Button>
                    <Button onClick={handleRemoveItem} color="error" variant="contained" autoFocus>
                        Eliminar
                    </Button>
                </DialogActions>


            </Dialog>
        </Container>
    );
}

export default PanelPage;
