/* eslint-disable no-loop-func */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import Socket from './Socket';
import Navbar from '../Navbar';
import Preview from '../Preview';
import Rest from './Rest';
import Store from '../../Redux/Store';
import SideMenu from '../SideMenu';
import AllModals from './allModals';
import SearchBar from '../SearchBar';
import SortableGroupList from './SortableGroupList';
import './Admin.css';
import Axios from 'axios';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = { groups: [] };
        this.Rest = new Rest();
        this.socket = null;
    }

    componentWillMount() {
        Axios.head('/isauth')
            .then(() => this.socket = Socket());
    }

    componentWillUnmount() {
        if (this.socket)
            this.socket.disconnect();
    }

    componentDidMount() {
        this.container.style.paddingLeft = '5px';
        this.setState({ groups: this.props.Redux.groups });
    }

    componentDidUpdate(prevProps) {
        Axios.head('/isauth')
            .catch(() => {
                if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
                    this.props.history.push('/login');
                else
                    window.location.replace('/login');
            });
        if (prevProps.Redux.toggleMenu !== this.props.Redux.toggleMenu) {
            if (this.props.Redux.toggleMenu)
                this.animateSideMenu('Open');
            else
                this.animateSideMenu('Close');
        }
        if (prevProps.Redux.groups !== this.props.Redux.groups)
            this.setState({ groups: this.props.Redux.groups });
    }

    animateSideMenu(action) {
        switch (action) {
            case 'Open':
                this.container.style.paddingLeft = `${this.props.Redux.sideMenuWidth + 5}px`;
                this.container.animate([
                    { paddingLeft: `5px` },
                    { paddingLeft: `${this.props.Redux.sideMenuWidth + 5}px` }
                ], { duration: 400, easing: 'ease-out' });
                return;
            case 'Close':
                this.container.style.paddingLeft = `5px`;
                this.container.animate([
                    { paddingLeft: `${this.props.Redux.sideMenuWidth + 5}px` },
                    { paddingLeft: `5px` }
                ], { duration: 400, easing: 'ease-out' });
                return;
            default:
                return;
        }
    }

    onSearchGroup = (groups) => {
        if (groups)
            this.setState({ groups: groups.map(group => group.id) });
        else
            this.setState({ groups: this.props.Redux.groups });
    }

    render() {
        const groups = Store.getState().Data.Groups;
        const groupWidth = 100 / this.props.Redux.layoutSize + '%';
        return (
            <div>
                <AllModals/>
                <SideMenu />
                <Navbar />
                <div ref={ (elem) => this.container = elem } className={ `container-fluid handle-fixed-navbar handle-side-menu` }>
                    <SearchBar list={groups} searchOptions={{ keys: ['name', 'description'] }} callback={this.onSearchGroup} />
                    <DragDropContext onDragEnd={this.Rest.moveDashboard}>
                        <SortableGroupList
                            groups={this.state.groups}
                            searched={this.props.Redux.groups !== this.state.groups}
                            groupWidth={groupWidth}
                        />
                    </DragDropContext>
                    <div className="my-3">
                        <Preview />
                    </div>
                </div>
            </div>
        );
    }
};

function mapStateToProps(state) {
    const groups = [...state.Data.Groups].sort((a, b) => {
        if (a.rank > b.rank)
            return 1;
        else if (a.rank < b.rank)
            return -1;
        else
            return 0;
    });
    return ({
        Redux: {
            groups: groups.map(group => group.id),
            layoutSize: state.Admin.layoutSize,
            sideMenuWidth: state.Admin.sideMenuWidth,
            authenticated: state.Admin.authenticated,
            toggleMenu: state.Admin.toggleMenu
        }
    });
}

export default withRouter(connect(mapStateToProps)(Admin));
/* eslint-enable no-loop-func */