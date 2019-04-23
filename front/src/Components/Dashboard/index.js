import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { IoMdCreate } from 'react-icons/io';
import './Dashboard.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={`list-group-item p-0 ${ this.props.isActive ? "active light-blue" : "" }`}>
                <a className={`ml-1 name ${ this.props.isActive ? "text-white" : "text-dark" }`} href={ this.props.href } target="_blank">{ this.props.href }</a>
                <button className="btn btn-noframe-dark p-1 pl-2 pr-2 float-right">
                    <IoMdCreate />
                </button>
            </div>
        );
    }
};

Dashboard.propTypes = {

}

export default withRouter(Dashboard);

/*<ul className="list-group list-group-flush">
                        <Dashboard href="http://test.com"></Dashboard>
                    </ul>*/