import React, { useState } from "react";
import { Button, Container, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext.jsx";
import { login as loginRequest } from '../api/auth.api.js';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        user: '',
        password: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        })
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await loginRequest(loginData)
            const { token } = response.data;

            if (token) {
                // guardamos el token en el contexto
                login(token, { user: loginData.user });
                navigate("/panel");
            } else {
                alert("Error: el servidor no devolvió un token");
            }

        } catch (error) {
            if (error.response.status === 401) {
                alert('Login fallido, por favor intenta nuevamente')
            }
            else {
                console.error('Login fallido por otros motivos', { mensaje: error.message })
            }
        }
    }

    return (
        <Container sx={{ marginTop: '200px' }}>
            <h4 style={{ display: 'flex' }}>Iniciar Sesión</h4>
            <form onSubmit={handleLogin}>
                <TextField fullWidth
                    label='Usuario'
                    margin="normal"
                    value={loginData.user}
                    name='user'
                    onChange={handleChange}
                    required>
                </TextField>

                <TextField fullWidth
                    label='Contraseña'
                    margin='normal'
                    value={loginData.password}
                    name='password'
                    type='password'
                    onChange={handleChange}
                    required>
                </TextField>

                <Button variant="contained" type="submit" sx={{ mt: 2, display: 'flex' }}>
                    Login
                </Button>

            </form>
        </Container>
    )
}

export default Login;