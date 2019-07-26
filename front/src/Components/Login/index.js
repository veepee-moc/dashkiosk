import React from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import Store from '../../Redux/Store';
import { Types, action } from '../../Redux/Actions';

const Login = ({ history }) => {
    const usernameInput = React.createRef();
    const passwordInput = React.createRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        const params = new URLSearchParams();
        params.append('username', 'root');
        params.append('password', 'root');
        Axios.get('/login', params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            .then(() => {
                Store.dispatch(action(Types.SetAdminState, { authenticated: true }));
                history.push('/admin');
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input ref={usernameInput} type="text" placeholder="Username" name="username" />
                <input ref={passwordInput} type="password" placeholder="Password" name="password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default withRouter(Login);