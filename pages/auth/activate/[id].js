import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { API } from '../../../config';
import { withRouter } from 'next/router';
import Layout from '../../../components/Layout';

const ActivateAccount = ({ router }) => {
    const [state, setState] = useState({
        name: '',
        token: '',
        buttonText: 'Activate Account',
        success: '',
        error: ''
    });
    const { name, token, buttonText, success, error } = state;

    useEffect(() => {
        let token = router.query.id;
        if (token) {
            const { name } = jwt.decode(token);
            setState({ ...state, name, token });
        }
    }, [router]);

    const clickSubmit = async event => {
        event.preventDefault();

        setState({ ...state, buttonText: 'Activating....' });

        try {
            const response = await axios.post(`${API}/register/activate`, { token });

            setState({ ...state, name: '', token: '', buttonText: 'Activated successfully', success: response.data.message });
        } catch (error) {
            setState({ ...state, buttonText: 'Activate Account', error: error.response.data.error });
        }
    };

    return (
        <Layout>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1>Hello {name}, Please activate your account</h1>
                    <br />
                    {success && success}
                    {error && error}
                    <button className="btn btn-outline-warning btn-block" onClick={clickSubmit}>
                        {buttonText}
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default withRouter(ActivateAccount);


    // console.log('ROUTER', router)
    // ROUTER ServerRouter {
    //     route: '/auth/activate/[id]',
    //     pathname: '/auth/activate/[id]',
    //     query: {},
    //     asPath: '/auth/activate/[id]',
    //     basePath: '',
    //     events: undefined,
    //     isFallback: false
    //   }
    // return <div>{JSON.stringify(router)}</div>
    // {
        // "pathname":"/auth/activate/[id]",
        // "route":"/auth/activate/[id]",
        // "query":{
        //     "id":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia2F0aWVsYW1iZXIwMkBnbWFpbC5jb20iLCJlbWFpbCI6ImthdGllbGFtYmVyMDJAZ21haWwuY29tIiwicGFzc3dvcmQiOiJrYXRpZWxhbWJlcjAyQGdtYWlsLmNvbSIsImlhdCI6MTU5OTQ3NjE0MiwiZXhwIjoxNTk5NDc2NzQyfQ.JgLLZlPCyYn866Dm5cnh4T6xUL_DJZ4b8W4B7su_w5I"},"asPath":"/auth/activate/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia2F0aWVsYW1iZXIwMkBnbWFpbC5jb20iLCJlbWFpbCI6ImthdGllbGFtYmVyMDJAZ21haWwuY29tIiwicGFzc3dvcmQiOiJrYXRpZWxhbWJlcjAyQGdtYWlsLmNvbSIsImlhdCI6MTU5OTQ3NjE0MiwiZXhwIjoxNTk5NDc2NzQyfQ.JgLLZlPCyYn866Dm5cnh4T6xUL_DJZ4b8W4B7su_w5I",
        //     "components":{
        //         "/auth/activate/[id]":{
        //             "styleSheets":[],
        //             "props":{
        //                 "pageProps":{}}
        //             },
        //             "/_app":{
        //                 "styleSheets":[]}
        //             },
        //             "isFallback":false,
        //             "basePath":"",
        //             "events":{}
        //         }
