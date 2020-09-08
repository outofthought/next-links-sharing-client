import Layout from '../../components/Layout'
import axios from 'axios'
import { API } from '../../config'
import { getCookie } from '../../helpers/auth'

const User = ({ user }) => <Layout>{JSON.stringify(user)}</Layout>

User.getInitialProps = async () => {
    const token = getCookie('token')
    console.log('TOKEN:', token)


    try {
        const response = await axios.get(`${API}/user`, {
            headers: {
                authorization: `Bearer ${token}`,
                contentType: 'application/json'
            }
        })
        return { user: response.data }
    } catch (error) {
        if (error.response.status === 401) {
            return { user: 'no user' }
        }
    }


}
export default User


// const User = ({ todos }) => {
//     return <Layout>{JSON.stringify(todos)}</Layout>
// }
// User.getInitialProps = async () => {
//     const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
//     return {
//         todos: response.data
//         // everything returned from getInitialProps comes as props for User
//         // const User = ({ todos }) => {
//         //     return <Layout>{JSON.stringify(todos)}</Layout>
//         // }
//     }
// }