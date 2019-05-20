import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import Socket from './Socket';
import Navbar from '../Navbar';
import Group from '../Group';
import Preview from '../Preview';
import Rest from './Rest';
import Store from '../../Store';
import { Types, action } from '../../Actions';
import SideMenu from '../SideMenu';
import './Admin.css';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.Rest = new Rest();
        this.Rest.loadGroupTags();
        Socket();
    }

    componentDidMount() {
        this.container.style.paddingLeft = '5px';
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
                this.container.style.paddingLeft = `${this.props.sideMenuWidth + 5}px`;
                this.container.animate([
                    { paddingLeft: `5px` },
                    { paddingLeft: `${this.props.sideMenuWidth + 5}px` }
                ], { duration: 400, easing: 'ease-out' });
                return;
            case 'Close':
                this.container.style.paddingLeft = `5px`;
                this.container.animate([
                    { paddingLeft: `${this.props.sideMenuWidth + 5}px` },
                    { paddingLeft: `5px` }
                ], { duration: 400, easing: 'ease-out' });
                return;
            default:
                return;
        }
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        if (oldIndex !== newIndex) {
            Store.dispatch(action(Types.SwapGroup, { src: oldIndex, dst: newIndex }));
            this.Rest.editRank(newIndex)
                .catch(() => Store.dispatch(action(Types.SortGroups)));
        }
    }

    renderSortableGroupList() {
        const SortableGroupItem = SortableElement(({value}) =>
            <li className="list-layout-item" style={{ width: 100 / this.props.layoutSize + '%' }}>
                <Group groupIndex={ value } />
            </li>
        );
        const SortableGroupList = SortableContainer(({items}) => 
            <ul className="list-layout">
                { items }
            </ul>
        );
        const groups = [];
        for (var i = 0; i < this.props.gourpsNbr; i++)
            groups.push(<SortableGroupItem key={ `group-${ i }` } index={ i } value={ i } />);
        return <SortableGroupList items={ groups } axis="xy" onSortEnd={ this.onSortEnd } useDragHandle />
    }

    render() {
        return (
            <div>
                <SideMenu />
                <Navbar />
                <div ref={ (elem) => this.container = elem } className={ `container-fluid handle-fixed-navbar handle-side-menu` }>
                    { this.renderSortableGroupList() }
                    <div className="my-3">
                        <Preview />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return ({
        gourpsNbr: state.admin.groups.length,
        toggleMenu: state.admin.toggleMenu,
        layoutSize: state.admin.layoutSize,
        sideMenuWidth: state.admin.sideMenuWidth
    });
}

export default withRouter(connect(mapStateToProps)(Admin));