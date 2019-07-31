import React from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

const Login = ({ history }) => {
    const params = new URLSearchParams();
    params.append('username', 'root');
    params.append('password', 'root');
    Axios.post('/login', params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
        .then(() => history.push('/admin'))
        .catch(err => console.error(err));
    return <a href="http://localhost:8080/admin"><button className="btn btn-primary btn-lg absolute center">LOGIN</button></a>;
};

export default withRouter(Login);