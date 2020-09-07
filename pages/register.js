import Layout from "../components/Layout"
import { useState } from 'react'
import axios from 'axios'
import { API, DOMAIN } from '../config'


// console.log('API', API, DOMAIN)

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

    const handleSubmit = async event => {
        setState({
            ...state, buttonText: 'Register processing...'
        })
        event.preventDefault()
        console.table({ name, email, password })
        try {
            const response = await axios.post(`${API}/register`, {
                name: name,
                email: email,
                password: password
            })
            console.log(response)
            setState({
                ...state,
                name: '',
                email: '',
                password: '',
                success: response.data.message,
                // res.json({
                //         message: `Email has been sent to ${email}`
                //         // {message: "Email has been sent to katielamber02@gmail.com"}
                //     })
                buttonText: 'Submitted'
            })
        } catch (error) {
            setState({ ...state, buttonText: 'Register', error: error.response.data.error })
        }
    }

    // const handleSubmit = event => {
    //     setState({
    //         ...state, buttonText: 'Register processing...'
    //     })
    //     event.preventDefault()
    //     console.table({ name, email, password })
    //     axios.post(`http://localhost:8000/api/register`, {
    //         name: name,
    //         email: email,
    //         password: password
    //     })
    //         .then(response => {
    //             setState({
    //                 ...state,
    //                 name: '',
    //                 email: '',
    //                 password: '',
    //                 success: response.data.message,
    //                 // res.json({
    //                 //         message: `Email has been sent to ${email}`
    //                 //         // {message: "Email has been sent to katielamber02@gmail.com"}
    //                 //     })
    //                 buttonText: 'Submitted'
    //             })
    //         })
    //         .catch(error => {
    //             setState({ ...state, buttonText: 'Register', error: error.data.error })
    //         })
    // }


    const registerFrom = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input value={name} onChange={handleChange('name')} type="text" className="form-control" placeholder="Type your name" required />
            </div>
            <div className="form-group">
                <input value={email} onChange={handleChange('email')} type="email" className="form-control" placeholder="Type your email" required />
            </div>

            <div className="form-group">
                <input value={password} onChange={handleChange('password')} type="password" className="form-control" placeholder="Type your password" required />
            </div>
            <div className="form-group">
                <button className="btn btn-outline-primary">{buttonText}</button>
            </div>
        </form>
    )
    return <Layout>
        {success && success}
        {error && error}
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



// sendRegistrationEmail.then(data => {
//     console.log('data submitted to SES:', data)
//     res.json({
//         message: `Email has been sent to ${email}`
//         // {message: "Email has been sent to katielamber02@gmail.com"}
//     })
// }).catch(error => {
//     console.log('error when data submitted to SES:', error)
//     res.json({
//         error: `Email could not be verified`
//     })
//     // {error: "Email could not be verified"}
//     // error: "Email could not be verified"
// })