import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
import Admin from './Components/Admin';
import Receiver from './Components/Receiver';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path={["/", "/receiver"]} component={Receiver} />
            <Route exact path="/admin" component={Admin} />
          </Switch>
        </BrowserRouter>
        <ToastContainer position="bottom-right"/>
      </div>
    );
  }
}

export default App;