import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'
import Router from 'next/router'
import axios from 'axios'
import { API } from '../config'
import { authenticate, isAuth } from '../helpers/auth'

const Login = () => {
    const [state, setState] = useState({
        email: 'katielamber02@gmail.com',
        password: 'katielamber02@gmail.com',
        error: '',
        success: '',
        buttonText: 'Login'
    });

    useEffect(() => {
        isAuth() && Router.push('/'); // check if there is any isAuth()
    }, [])

    const { email, password, error, success, buttonText } = state

    const handleChange = name => e => {
        setState({ ...state, [name]: e.target.value, error: '', success: '', buttonText: 'Login' })
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setState({ ...state, buttonText: 'Logging in' })
        try {
            const response = await axios.post(`${API}/login`, {
                email,
                password
            });
            console.log('TOKEN_ON_THE_CLIENT:', response.data.token); // data > token / user
            authenticate(response, () =>
                isAuth() && isAuth().role === 'admin' ? Router.push('/admin') : Router.push('/user')
            );
        } catch (error) {
            console.log(error);
            setState({ ...state, buttonText: 'Login', error: error.response.data.error })
        }
    };

    const loginForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    value={email}
                    onChange={handleChange('email')}
                    type="email"
                    className="form-control"
                    placeholder="Type your email"
                    required
                />
            </div>
            <div className="form-group">
                <input
                    value={password}
                    onChange={handleChange('password')}
                    type="password"
                    className="form-control"
                    placeholder="Type your password"
                    required
                />
            </div>
            <div className="form-group">
                <button className="btn btn-outline-warning">{buttonText}</button>
            </div>
        </form>
    );

    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <h1>Login</h1>
                {JSON.stringify(isAuth())}
                <br />
                {success && success}
                {error && error}
                {loginForm()}
            </div>
        </Layout>
    );
};

export default Login;