import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Rest from '../Group/Rest';
import './Display.css';
import {IoIosWifi} from 'react-icons/io';
import Store from '../../Store';
import { Types, action } from '../../Actions';

class Display extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'UNKNOWN',
            description: '',
            on: true,
            showModal: false,
        };
        this.Rest = Rest;
    }

    updateDisplay() {
        if (this.props.display) {
            this.setState({
                name: this.props.display.name,
                description: this.props.display.description,
                on: this.props.display.connected
            });
        }
    }

    openModal = () => {
        Store.dispatch(action(Types.SetModal, {
            modal: {
                show: 'editDisplay',
                display: this.props.display,
                rest: this.Rest
            }
        }));
    }

    componentDidMount() {
        this.updateDisplay();
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.display !== prevProps.display) {
            this.updateDisplay();
        }
    }
    
    render() {
        return (
            <div>
                <div onClick={() => this.openModal()} className={"embed-responsive embed-responsive-16by9 rounded display" + (this.state.on ? " on" : "")}>
                    <IoIosWifi hidden={(this.props.display && !this.props.display.chromecast ? true : false)} className="ml-2 chromecastIcon absolute left bottom" />
                    <div className="embed-responsive-item content">
                        <p className="text-monospace text-light mb-0 innerDisplay">{this.state.name}</p>
                        <p className="text-monospace text-light font-italic displayName">{this.state.description}</p>
                    </div>
                </div>
            </div>
        );
    }
};

function mapStateToProps(state, ownProps) {
    return {
        display: state.Data.Displays.find(obj => obj.id === ownProps.displayId)
    };
}

export default withRouter(connect(mapStateToProps)(Display));