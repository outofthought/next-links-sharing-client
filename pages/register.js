import Layout from "../components/Layout"
import { useState } from 'react'
import axios from 'axios'

const Register = () => {

    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: '',
        buttonText: 'Register'
    })
    const { name, email, password, error, success, buttonText } = state
    const handleChange = (name) => (event) => {

        setState({ ...state, [name]: event.target.value, error: '', success: '', buttonText: 'Register' })
    }
    const handleSubmit = event => {
        event.preventDefault()
        console.table({ name, email, password })
        axios.post(`http://localhost:8000/api/register`, {
            name: name,
            email: email,
            password: password
        })
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }


    const registerFrom = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input value={name} onChange={handleChange('name')} type="text" className="form-control" placeholder="Type your name" />
            </div>
            <div className="form-group">
                <input value={email} onChange={handleChange('email')} type="email" className="form-control" placeholder="Type your email" />
            </div>

            <div className="form-group">
                <input value={password} onChange={handleChange('password')} type="password" className="form-control" placeholder="Type your password" />
            </div>
            <div className="form-group">
                <button className="btn btn-outline-primary">{buttonText}</button>
            </div>
        </form>
    )
    return <Layout>
        <div className="col-md-6 offset-md-3">
            <h1>Register</h1>
            <br />
            {registerFrom()}
            <br />
            {JSON.stringify(state)}
        </div>
    </Layout>
}

export default Register