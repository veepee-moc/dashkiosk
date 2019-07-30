import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Types, action } from './Redux/Actions';
import { ToastContainer } from 'react-toastify';
import Axios from 'axios';
import Admin from './Components/Admin';
import Receiver from './Components/Receiver';
import FromServer from './Components/FromServer';
import History from './Components/History';
import Login from './Components/Login';

class App extends Component {
  componentWillMount() {
    Axios.get('/api/settings/config')
      .then(res => this.props.Redux.setSettings(res.data))
      .catch(err => console.error(`Failed to get configuration file: ${err.message}`));
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path={["/", "/receiver"]} component={Receiver} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/history" component={History} />
            {
              !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ?
                <Switch>
                  <Route exact path="/login" component={Login} />
                  <Route component={FromServer} />
                </Switch>
              :
                null
            }
          </Switch>
        </BrowserRouter>
        <ToastContainer position="bottom-right" autoClose={2500} pauseOnVisibilityChange={false} closeOnClick pauseOnHover />
      </div>
    );
  }
};

function mapDispatchWithProps(dispatch) {
  return {
    Redux: {
      setSettings: payload => dispatch(action(Types.SetSettings, payload))
    }
  };
}

export default connect(null, mapDispatchWithProps)(App);