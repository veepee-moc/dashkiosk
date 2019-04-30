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
                <ul className="container nav flex-column" aria-orientation="vertical">
                    <li className="nav-item">
                        <button className="btn btn-outline-light mt-2" style={{ width: "80%", marginLeft: "10%" }}>History</button>
                    </li>
                    <li className="nav-item">
                        <a className="btn btn-outline-light my-2" style={{ width: "80%", marginLeft: "10%" }}
                            href="https://dashkiosk.readthedocs.io/en/v2.7.3/usage.html#administration">
                            Documentation
                        </a>
                    </li>
                    <hr className="border-bottom w-50"/>
                    <li className="nav-item">
                        <button className="btn btn-outline-light mt-2" style={{ width: "80%", marginLeft: "10%" }}>Broadcast</button>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-outline-light mt-2" style={{ width: "80%", marginLeft: "10%" }}>Add new group</button>
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