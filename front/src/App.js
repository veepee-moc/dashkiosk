import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Axios from 'axios';
import Admin from './Components/Admin';
import Receiver from './Components/Receiver';
import FromServer from './Components/FromServer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';

class App extends Component {
  componentDidMount() {
    Axios.get('/api/settings/config')
      .then(ret => console.log(ret))
      .catch((err) => console.error(`Failed to get configuration file: ${err.message}`));
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path={["/", "/receiver"]} component={Receiver} />
            <Route exact path="/admin" component={Admin} />
            <Route path="/*" component={FromServer} />
          </Switch>
        </BrowserRouter>
        <ToastContainer position="bottom-right"/>
      </div>
    );
  }
}

export default App;