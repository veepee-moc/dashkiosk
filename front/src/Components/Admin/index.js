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
        this.state = {
            animationScale: 1
        };
        this.Rest = new Rest();
        Socket();
        this.onSortEnd = this.onSortEnd.bind(this);
        this.setAnimationScale = this.setAnimationScale.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.setAnimationScale);
        this.setAnimationScale();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setAnimationScale);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.toggleMenu !== this.props.toggleMenu) {
            if (this.props.toggleMenu)
                this.animateSideMenu('Open');
            else
                this.animateSideMenu('Close');
        }
        if (prevProps.sideMenuWidth !== this.props.sideMenuWidth)
            this.setAnimationScale();
    }

    setAnimationScale() {
        const width = window.innerWidth;
        this.setState({
            animationScale: (width - this.props.sideMenuWidth) / width
        });
    }

    animateSideMenu(action) {
        switch (action) {
            case 'Open':
                this.container.animate([
                    { transform: 'scale(1)' },
                    { transform: `scale(${ this.state.animationScale })` }
                ], { duration: 400, easing: 'ease-out' });
                this.container.style.transform = `scale(${ this.state.animationScale })`;
                return;
            case 'Close':
                this.container.animate([
                    { transform: `scale(${ this.state.animationScale })` },
                    { transform: 'scale(1)' }
                ], { duration: 400, easing: 'ease-out' });
                this.container.style.transform = 'scale(1)';
                return;
            default:
                return;
        }
    }

    onSortEnd({ oldIndex, newIndex }) {
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