import React, { Component } from 'react';
import Axios from 'axios';
import FormInput from '../formInput';
import { toast } from 'react-toastify';
import Rest from './Rest';

class MultiDashboardEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
          multDashboard: null
        };
        this.Rest = new Rest();
    }

    componentDidMount() {
      this.getMultDashboardInfo();
    }

    componentDidUpdate(prevProps) {
      if (this.props.url !== prevProps.url)
        this.getMultDashboardInfo();
    }

    getMultDashboardInfo() {
      if (this.props.url && this.props.url.match(/\/api\/multi-dashboards\/\d+/))
        Axios.get(`${this.props.url}/info`)
          .then((res) => {
            if (res.status === 204)
              throw new Error('This multi dashboard doesn\'t exist.');
            this.setState({
              multDashboard: res.data
            });
          })
          .catch((err) => toast.error(`Failed to load multi dashboards info: ${err}`));
    }

    handleInput = (inputName, inputValue, event) => {
      if (!this.state.multDashboard)
        return;
      const multDashboard = Object.assign({}, this.state.multDashboard);
      multDashboard.urls[parseInt(event.target.attributes.index.value)] = inputValue;
      this.setState({
        multDashboard: multDashboard
      });
    }

    renderMultDashInput() {
      if (!this.state.multDashboard)
        return <div></div>;
      return this.state.multDashboard.urls.map((url, key) =>
        <FormInput
          className="p-0"
          key={key}
          index={key}
          sm={12}
          required={true}
          value={url}
          placeholder='Url'
          name='Url'
          updateValue={this.handleInput}
          onError='Insert an URL on upload an image'
          type='url'
          data-name='dashkiosk'
          upload-route='/api/upload'
        />
      );
    }

    render() {
        return (
            <>
              {this.renderMultDashInput()}
              <div className="text-right">
                <button type="button" className="btn btn-primary"
                 onClick={() => this.Rest.updateMultiDashboard(this.state.multDashboard)}>
                  Save
                </button>
              </div>
            </>
        );
    }
};

export default MultiDashboardEdit;