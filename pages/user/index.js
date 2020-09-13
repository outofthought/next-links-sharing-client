import Layout from '../../components/Layout';
import axios from 'axios';
import { API } from '../../config';
import { getCookie } from '../../helpers/auth';
import withUser from '../withUser';

const User = ({ user, token }) => (
  <Layout>
    <pre>{JSON.stringify(user, undefined, 2)}</pre>
  </Layout>
);

// const User = ({ user, token }) => (
//   <Layout>{JSON.stringify(user, null, '\t')}</Layout>
// ); // shows user only not token
//const User = ({ token }) => <Layout>{JSON.stringify(token)}</Layout>  // shows token only

//const User = ({ user }) => <Layout>{JSON.stringify(user)}</Layout>

// User.getInitialProps = async (context) => {
//     const token = getCookie('token', context.req)
//     // console.log('TOKEN:', token)

//     try {
//         const response = await axios.get(`${API}/user`, {
//             headers: {
//                 authorization: `Bearer ${token}`,
//                 contentType: 'application/json'
//             }
//         })
//         return { user: response.data }
//     } catch (error) {
//         if (error.response.status === 401) {
//             return { user: 'no user' }
//         }
//     }

// }
export default withUser(User);

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
