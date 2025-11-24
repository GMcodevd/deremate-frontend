import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Home.css';
import Slider from '../components/Slider';
import { Routes, Route } from 'react-router-dom';
import { getAllProducts } from '../api/mateService.js';
import MatesPage from './MatesPage.jsx';
import AccesoriosPage from './AccesoriosPage.jsx';
import CombosPage from './CombosPage.jsx';
import BombillasPage from './BombillasPage.jsx';
import TermosPage from './TermosPage.jsx';
import PanelAdmin from './PanelAdmin.jsx';
import MenuOpciones from '../components/MenuOpciones.jsx';
import DestacadosPage from './DestacadosPage.jsx';
import TodosLosProductos from './TodosLosProductos.jsx';
import { useLocation } from "react-router-dom";
import BusquedaUser from './BusquedaUser.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import Login from './LoginPage.jsx';
import PrivateRoute from '../components/PrivateRoute.jsx';
import Grabados from '../components/Grabados.jsx';
import ContactoPage from './ContactoPage.jsx';
import { Toolbar } from '@mui/material';


function Home() {

    //Para manejar los estilos según la ruta (inicio oscuro, secciones claras)
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") {
            document.body.className = "body-dark";
        } else {
            document.body.className = "body-light";
        }
    }, [location]);


    // arreglo global de productos
    const [products, setProducts] = useState([]);

    // Búsqueda ingresada en header
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (Term) => {
        setSearchTerm(Term);
    }

    useEffect(() => {
        fetchData();
    }, [])


    const fetchData = async (param) => {
        try {
            const response = await getAllProducts(param);
            if (!Array.isArray(response.data)) {
                setProducts([]); // Evita romper todo
                return;
            }

            setProducts(response.data);
        } catch (error) {
            console.error({ mensaje: 'error al obtener productos', error });
            setProducts([]);
        }
    };



    // Filtro que comunica la entrada del usuario
    const filteredProducts = products.filter((p) => {
        const term = searchTerm.toLowerCase().trim();
        return (
            p.name?.toLowerCase().includes(term) ||
            p.description?.toLowerCase().includes(term) ||
            p.category?.toLowerCase().includes(term)
        );
    });

    return (

        <div className='home-container'>
            <header>
                <Header handleChange={handleChange} />
                {/* Espaciador para que el contenido no quede tapado por el header */}
                <Toolbar />
            </header>

            <main>
                <WhatsAppButton></WhatsAppButton>
                <Routes>
                    {/*Todas las secciones que conforman el inicio */}
                    <Route path='/'
                        element={<>
                            <section id='slider'>
                                <Slider></Slider>
                            </section>

                            <section id='menu-opciones'>
                                <MenuOpciones></MenuOpciones>
                            </section>

                            <section id='destacados' className='section-content'>
                                <DestacadosPage products={products}></DestacadosPage>
                            </section>

                            <section id='grabados'>
                                <Grabados></Grabados>
                            </section>
                        </>}>
                    </Route>

                    {/*Rutas individuales */}

                    <Route path='/mates' element={<MatesPage products={products}></MatesPage>}></Route>
                    <Route path='/termos' element={<TermosPage products={products}></TermosPage>}></Route>
                    <Route path='/combos' element={<CombosPage products={products}></CombosPage>}></Route>
                    <Route path='/bombillas' element={<BombillasPage products={products}></BombillasPage>}></Route>
                    <Route path='/accesorios' element={<AccesoriosPage products={products}></AccesoriosPage>}></Route>
                    <Route path='/busqueda' element={<BusquedaUser products={searchTerm ? filteredProducts : products} searchTerm={searchTerm} />}></Route>
                    <Route path='/todos-los-productos' element={<TodosLosProductos products={products}></TodosLosProductos>}></Route>
                    <Route path='/contacto' element={<ContactoPage></ContactoPage>}></Route>

                    <Route path='/login' element={<Login></Login>}></Route>
                    <Route element={<PrivateRoute></PrivateRoute>}>
                        <Route><Route path='/panel' element={<PanelAdmin products={products} setProducts={setProducts}></PanelAdmin>}></Route></Route>
                    </Route>
                </Routes>
            </main>

            <footer>
                <Footer></Footer>
            </footer>
        </div >

    );
}

export default Home;