import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { IoMdSearch } from 'react-icons/io';
import { DragDropContext } from 'react-beautiful-dnd';
import Socket from './Socket';
import Navbar from '../Navbar';
import Group from '../Group';
import Preview from '../Preview';
import Rest from './Rest';
import Store from '../../Store';
import { Types, action } from '../../Actions';
import SideMenu from '../SideMenu';
import AllModals from './allModals';
import './Admin.css';
import Fuse from 'fuse.js';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searched_groups: [],
            search_input: ''
        };
        this.searchOptions = {
            shouldSort: true,
            matchAllTokens: true,
            tokenize: true,
            threshold: 0.3,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: [
              "description",
              "name"
            ]
          };
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

    searchBar = () =>
        <div className="input-group input-group-lg mx-auto mb-2 w-75 handle-fixed-navbar handle-side-menu">
            <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-lg"><IoMdSearch /></span>
            </div>
            <input onChange={this.searchEngine} type="text" className="form-control" aria-label="search" aria-describedby="inputGroup-sizing-sm" />
        </div>

    searchEngine = (event) => {
        this.setState({ search_input: event.target.value });
        if (event.target.value.length === 0) {
            if (this.state.searched_groups !== [])
                this.setState({ searched_groups: [] });
            return;
        }
        var fuse = new Fuse(Store.getState().admin.groups, this.searchOptions);
        this.setState({ searched_groups: fuse.search(event.target.value) });
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        if (oldIndex !== newIndex) {
            Store.dispatch(action(Types.SwapGroup, { src: oldIndex, dst: newIndex }));
            this.Rest.editRank(newIndex)
                .catch(() => Store.dispatch(action(Types.SortGroups)));
        }
    }

    renderSortableGroupList() {
        const size = 100 / this.props.layoutSize + '%';
        const SortableGroupItem = SortableElement(({value, searched}) =>
            <li className="list-layout-item d-inline-block" style={{ width: size, maxWidth: size }}>
                <Group groupIndex={ value } searched={ searched } />
            </li>
        );
        const SortableGroupList = SortableContainer(({items}) =>
            <ul className="list-layout">
                { items }
            </ul>
        );
        const groups = [];
        if (this.state.search_input.length > 0) {
            for (var i = 0; i < this.props.gourpsNbr; i++) {
                if (this.state.searched_groups.find(group => {return group.id === Store.getState().admin.groups[i].id}))
                    groups.push(<SortableGroupItem key={ `group-${ i }` } index={ i } value={ i } searched={ true }/>);
            }
        }
        else {
            for (var i = 0; i < this.props.gourpsNbr; i++)
                groups.push(<SortableGroupItem key={ `group-${ i }` } index={ i } value={ i } searched={ false }/>);
        }
        return <SortableGroupList items={ groups } axis="xy" onSortEnd={ this.onSortEnd } useDragHandle />
    }

    render() {
        return (
            <div>
                <AllModals/>
                <SideMenu />
                <Navbar />
                <div ref={ (elem) => this.container = elem } className={ `container-fluid` }>
                    {this.searchBar()}
                    <DragDropContext onDragEnd={this.Rest.moveDashboard}>
                        { this.renderSortableGroupList() }
                    </DragDropContext>
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