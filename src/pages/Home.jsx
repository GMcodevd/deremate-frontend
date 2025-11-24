import React, { useEffect, useState, useRef } from 'react';
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

function Home() {
    const location = useLocation();

    // Ref para medir altura real del header
    const headerRef = useRef(null);
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        if (location.pathname === "/") {
            document.body.className = "body-dark";
        } else {
            document.body.className = "body-light";
        }
    }, [location]);

    useEffect(() => {
        // Ajusta altura del header dinámicamente
        if (headerRef.current) {
            setHeaderHeight(headerRef.current.offsetHeight);
        }

        // Recalcula si la ventana cambia de tamaño
        const handleResize = () => {
            if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const handleChange = (Term) => setSearchTerm(Term);

    useEffect(() => { fetchData(); }, [])

    const fetchData = async (param) => {
        try {
            const response = await getAllProducts(param);
            if (!Array.isArray(response.data)) {
                setProducts([]);
                return;
            }
            setProducts(response.data);
        } catch (error) {
            console.error({ mensaje: 'error al obtener productos', error });
            setProducts([]);
        }
    };

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
            {/* Header con ref */}
            <header ref={headerRef}>
                <Header handleChange={handleChange} />
            </header>

            {/* Main con padding dinámico para no tapar el contenido */}
            <main style={{ paddingTop: headerHeight }}>
                <WhatsAppButton />
                <Routes>
                    <Route path='/' element={
                        <>
                            <section id='slider'>
                                <Slider />
                            </section>
                            <section id='menu-opciones'>
                                <MenuOpciones />
                            </section>
                            <section id='destacados' className='section-content'>
                                <DestacadosPage products={products} />
                            </section>
                            <section id='grabados'>
                                <Grabados />
                            </section>
                        </>
                    } />
                    <Route path='/mates' element={<MatesPage products={products} />} />
                    <Route path='/termos' element={<TermosPage products={products} />} />
                    <Route path='/combos' element={<CombosPage products={products} />} />
                    <Route path='/bombillas' element={<BombillasPage products={products} />} />
                    <Route path='/accesorios' element={<AccesoriosPage products={products} />} />
                    <Route path='/busqueda' element={<BusquedaUser products={searchTerm ? filteredProducts : products} searchTerm={searchTerm} />} />
                    <Route path='/todos-los-productos' element={<TodosLosProductos products={products} />} />
                    <Route path='/contacto' element={<ContactoPage />} />
                    <Route path='/login' element={<Login />} />
                    <Route element={<PrivateRoute />}>
                        <Route path='/panel' element={<PanelAdmin products={products} setProducts={setProducts} />} />
                    </Route>
                </Routes>
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Home;
