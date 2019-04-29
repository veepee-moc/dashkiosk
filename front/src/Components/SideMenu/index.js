import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IoMdArrowBack } from 'react-icons/io';
import Store from '../../Store';
import { Types, action } from '../../Actions';
import './SideMenu.css';

class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.closeSideMenu = this.closeSideMenu.bind(this);
    }

    closeSideMenu() {
        Store.dispatch(action(Types.SetAdminState, { toggleMenu: false }));
    }

    render() {
        return (
            <div className={ `bg-dark side-menu ${ this.props.toggleMenu ? 'side-menu-active' : '' }` }>
                <button className={ `float-right btn btn-noframe-light m-1` }
                    style={{ fontSize: "30px" }} onClick={ this.closeSideMenu }>
                    <IoMdArrowBack className={ `side-menu-btn ${ this.props.toggleMenu ? 'side-menu-btn-active' : '' }` } />
                </button>
                <ul className="container list-group px-3">
                    <li className="list-group-item">
                        <button className="btn">Broadcast</button>
                    </li>
                    <li className="list-group-item">
                        <button className="btn">Add new group</button>
                    </li>
                </ul>
            </div>
        );
    }
};

function mapStateWithProps(state) {
    return {
        toggleMenu: state.admin.toggleMenu
    };
}

export default connect(mapStateWithProps)(SideMenu);