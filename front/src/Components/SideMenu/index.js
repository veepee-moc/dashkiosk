import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IoMdArrowBack, IoMdAdd, IoMdRemove, IoMdTime, IoMdBook, IoMdWifi, IoMdGrid } from 'react-icons/io';
import Collapse from '../Collapse';
import Store from '../../Store';
import { Types, action } from '../../Actions';
import './SideMenu.css';

class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layoutSizeCollapsed: true
        };
        this.closeSideMenu = this.closeSideMenu.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.toggleMenu !== this.props.toggleMenu) {
            if (this.props.toggleMenu)
                this.animateSideMenu('Open');
            else
                this.animateSideMenu('Close');
        }
    }

    animateSideMenu(action) {
        switch (action) {
            case 'Open':
                this.mainDiv.animate([
                    { transform: 'translateX(-100%)' },
                    { transform: 'translateX(0%)' }
                ], { duration: 400, easing: 'ease-out' });
                this.mainDiv.style.transform = 'translateX(0%)';
                return;
            case 'Close':
                this.mainDiv.animate([
                    { transform: 'translateX(0%)' },
                    { transform: 'translateX(-100%)' }
                ], { duration: 400, easing: 'ease-out' });
                this.mainDiv.style.transform = 'translateX(-100%)';
                return;
            default:
                return;
        }
    }

    closeSideMenu() {
        Store.dispatch(action(Types.SetAdminState, { toggleMenu: false }));
    }

    render() {
        return (
            <div ref={ (elem) => this.mainDiv = elem } className={ `bg-dark side-menu` }>
                <button className={ `float-right btn btn-noframe-light m-1` }
                    style={{ fontSize: "30px" }} onClick={ this.closeSideMenu }>
                    <IoMdArrowBack className={ `side-menu-btn ${ this.props.toggleMenu ? 'side-menu-btn-active' : '' }` } />
                </button>
                <ul className="container nav flex-column px-0">
                    <li className="nav-item">
                        <button className="btn btn-noframe-light d-block w-100 rounded-0 text-left">
                            <IoMdTime width="20" height="20" /> History
                        </button>
                    </li>
                    <li className="nav-item">
                        <a className="btn btn-noframe-light d-block w-100 rounded-0 text-left"
                            href="https://dashkiosk.readthedocs.io/en/v2.7.3/usage.html#administration">
                            <IoMdBook width="20" height="20" /> Documentation
                        </a>
                    </li>
                    <hr className="border-bottom w-90 my-2" />
                    <li className="nav-item">
                        <button className="btn btn-noframe-light d-block w-100 rounded-0 text-left">
                            <IoMdWifi width="20" height="20" /> Broadcast
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-noframe-light d-block w-100 rounded-0 text-left">
                            <IoMdAdd width="20" height="20" /> Add new group
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-noframe-light d-block w-100 rounded-0 text-left p-relative"
                            data-toggle="collapse" data-target="#layoutSizeCollapse"
                            onClick={ () => this.setState({ layoutSizeCollapsed: !this.state.layoutSizeCollapsed }) }>
                            <IoMdGrid width="20" height="20" /> Layout Size
                            <IoMdArrowBack width="20px" height="20px"
                                className={ `sidem-dd-arrow ${ this.state.layoutSizeCollapsed ? '' : 'active' }` } />
                        </button>
                        <Collapse collapsed={ this.state.layoutSizeCollapsed }>
                            <div className="w-40 bg-light mx-auto p-relative" style={{ height: "40px", boxShadow: "0px 0px 3px black inset" }}>
                                <button className="btn btn-noframe-dark absolute-left" onClick={ () => this.props.decrLayoutSize() }>
                                    <IoMdRemove />
                                </button>
                                <span className="absolute-center">{ this.props.layoutSize }</span>
                                <button className="btn btn-noframe-dark absolute-right" onClick={ () => this.props.incrLayoutSize() }>
                                    <IoMdAdd />
                                </button>
                            </div>
                        </Collapse>
                    </li>
                </ul>
            </div>
        );
    }
};

function mapStateWithProps(state) {
    return {
        toggleMenu: state.admin.toggleMenu,
        layoutSize: state.admin.layoutSize
    };
}

function mapDispatchWithProps(dispatch) {
    return {
        incrLayoutSize: () => dispatch(action(Types.IncrLayoutSize)),
        decrLayoutSize: () => dispatch(action(Types.DecrLayoutSize))
    };
}

export default connect(mapStateWithProps, mapDispatchWithProps)(SideMenu);