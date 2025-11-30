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
    const headerRef = useRef(null);
    const [headerHeight, setHeaderHeight] = useState(0);
    const extraPadding = 50; // padding extra para que nunca queden pegadas las secciones

    useEffect(() => {
        document.body.className = location.pathname === "/" ? "body-dark" : "body-light";
    }, [location]);

    useEffect(() => {
        if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
        const handleResize = () => {
            if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const handleChange = (Term) => setSearchTerm(Term);

    useEffect(() => { fetchData(); }, []);

    const fetchData = async (param) => {
        try {
            const response = await getAllProducts(param);
            setProducts(Array.isArray(response.data) ? response.data : []);
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

    const isMobile = window.innerWidth <= 600;

    // En mobile el header es mucho más alto → le sumamos un mínimo
    const sectionPadding =
        headerHeight + extraPadding < (isMobile ? 230 : 150)
            ? (isMobile ? 230 : 150)
            : headerHeight + extraPadding;


    return (
        <div className='home-container'>
            <header ref={headerRef}>
                <Header handleChange={handleChange} />
            </header>

            <main>
                <WhatsAppButton />

                <Routes>
                    <Route path='/' element={
                        <>
                            {/* Slider principal SIN padding */}
                            <section id='slider'>
                                <Slider />
                            </section>

                            {/* Secciones de inicio */}
                            <div className='inicio-secciones'>
                                <section id='menu-opciones'>
                                    <MenuOpciones />
                                </section>
                                <section id='destacados' className='section-content'>
                                    <DestacadosPage products={products} />
                                </section>
                                <section id='grabados'>
                                    <Grabados />
                                </section>
                            </div>
                        </>
                    } />

                    {/* Rutas internas: se empujan según headerHeight + extraPadding */}
                    <Route path='/mates' element={
                        <div className='seccion-interna' style={{ paddingTop: sectionPadding }}>
                            <MatesPage products={products} />
                        </div>
                    } />
                    <Route path='/termos' element={
                        <div className='seccion-interna' style={{ paddingTop: sectionPadding }}>
                            <TermosPage products={products} />
                        </div>
                    } />
                    <Route path='/combos' element={
                        <div className='seccion-interna' style={{ paddingTop: sectionPadding }}>
                            <CombosPage products={products} />
                        </div>
                    } />
                    <Route path='/bombillas' element={
                        <div className='seccion-interna' style={{ paddingTop: sectionPadding }}>
                            <BombillasPage products={products} />
                        </div>
                    } />
                    <Route path='/accesorios' element={
                        <div className='seccion-interna' style={{ paddingTop: sectionPadding }}>
                            <AccesoriosPage products={products} />
                        </div>
                    } />
                    <Route path='/busqueda' element={
                        <div className='seccion-interna' style={{ paddingTop: sectionPadding }}>
                            <BusquedaUser products={searchTerm ? filteredProducts : products} searchTerm={searchTerm} />
                        </div>
                    } />
                    <Route path='/todos-los-productos' element={
                        <div className='seccion-interna' style={{ paddingTop: sectionPadding }}>
                            <TodosLosProductos products={products} />
                        </div>
                    } />
                    <Route path='/contacto' element={
                        <div className='seccion-interna' style={{ paddingTop: sectionPadding }}>
                            <ContactoPage />
                        </div>
                    } />
                    <Route path='/login' element={<Login />} />
                    <Route element={<PrivateRoute />}>
                        <Route path='/panel' element={
                            <div className='seccion-interna' style={{ paddingTop: sectionPadding }}>
                                <PanelAdmin products={products} setProducts={setProducts} />
                            </div>
                        } />
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
