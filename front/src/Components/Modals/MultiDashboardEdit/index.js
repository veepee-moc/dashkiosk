import React, { Component } from 'react';
import FormInput from '../formInput';

class MultiDashboardEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleInput = () => {
        
    }

    renderMultDashInput() {

    }

    render() {
        return (
            <div>
                <FormInput
                  sm={12}
                  required={true}
                  value={''}
                  placeholder='Url'
                  name='Url'
                  updateValue={this.handleInput}
                  onError='Insert an URL on upload an image'
                  type='url'
                  data-name='dashkiosk'
                  upload-route='/api/upload'
                />
                <FormInput
                  sm={12}
                  required={true}
                  value={''}
                  placeholder='Url'
                  name='Url'
                  updateValue={this.handleInput}
                  onError='Insert an URL on upload an image'
                  type='url'
                  data-name='dashkiosk'
                  upload-route='/api/upload'
                />
                <FormInput
                  sm={12}
                  required={true}
                  value={''}
                  placeholder='Url'
                  name='Url'
                  updateValue={this.handleInput}
                  onError='Insert an URL on upload an image'
                  type='url'
                  data-name='dashkiosk'
                  upload-route='/api/upload'
                />
                <FormInput
                  sm={12}
                  required={true}
                  value={''}
                  placeholder='Url'
                  name='Url'
                  updateValue={this.handleInput}
                  onError='Insert an URL on upload an image'
                  type='url'
                  data-name='dashkiosk'
                  upload-route='/api/upload'
                />
            </div>
        );
    }
};

export default MultiDashboardEdit;