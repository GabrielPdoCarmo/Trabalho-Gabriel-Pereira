// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';
import yugiohImage from '../img/yugioh-img.png'; // Importe sua imagem local aqui
import yugi8byts from "../img/yugi-8byts.png";
import kaiba8byts from "../img/kaiba-8byts.png";
import milenio from '../img/reliquia.png';
import olho from '../img/olho.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Função para verificar login
    const handleLogin = (event) => {
        event.preventDefault();

        // Verificar se email é válido
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setMessage('Por favor, insira um email válido.');
            return;
        }

        // Verificar se a senha tem pelo menos 8 caracteres
        if (password.length < 8) {
            setMessage('A senha deve ter pelo menos 8 caracteres.');
            return;
        }

        // Simula um login bem-sucedido se todos os campos estão preenchidos corretamente
        if (email && password) {
            alert('Login Realizado com Sucesso!!');

            navigate('/cards');
        } else {
            setMessage('Por favor, preencha todos os campos.');
        }
    };

    return (
        <div>
            <div className="login-image">
                <img src={yugiohImage} alt="Yu-Gi-Oh! Image" />
            </div>
            <div className="login-label">
                <img className="yugi-image" src={yugi8byts} alt="Yu-Gi-Oh! 8bits Image" />
                <img className="kaiba-image" src={kaiba8byts} alt="Yu-Gi-Oh! 8bits Image" />
                <h2>Login</h2>
            </div>
            <div className="login-form">
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                backgroundImage: `url(${milenio})`,
                                backgroundSize: '20px',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: '10px center',
                                paddingLeft: '40px'
                            }}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                backgroundImage: `url(${milenio})`,
                                backgroundSize: '20px',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: '10px center',
                                paddingLeft: '40px'
                            }}
                        />
                    </div>
                    <button style={{
                        backgroundImage: `url(${olho})`,
                        backgroundSize: '20px',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: '10px center',
                        paddingLeft: '40px'
                    }} type="submit">Entrar</button>
                </form>
                {message && <div id="message">{message}</div>}
            </div>
        </div>
    );
};

export default Login;
