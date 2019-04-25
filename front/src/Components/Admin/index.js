import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';
import Socket from './Socket';
import Navbar from '../Navbar';
import Group from '../Group';
import Preview from '../Preview';
import Rest from './Rest';
import Store from '../../Store';
import { Types, action } from '../../Actions';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layoutSize: 3
        };
        this.Rest = new Rest();
        Socket();
        this.setLayoutSize = this.setLayoutSize.bind(this);
        this.onSortEnd = this.onSortEnd.bind(this);
    }

    setLayoutSize(incr) {
        var newLayoutSize = this.state.layoutSize + incr;
        if (newLayoutSize < 1)
            newLayoutSize = 1;
        this.setState({
            layoutSize: newLayoutSize
        });
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
            <li className="list-layout-item" style={{ width: 100 / this.state.layoutSize + '%' }}>
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
                <Navbar />
                <div className="container-fluid mt-3">
                    <div className="text-center mt-2">
                        <span className="border rounded p-1 bg-white">
                            <button className="btn btn-noframe-dark btn-sm mx-1 py-0 px-1 mb-1" onClick={ () => this.setLayoutSize(-1) }>
                                <IoMdRemove />
                            </button>
                            { this.state.layoutSize }
                            <button className="btn btn-noframe-dark btn-sm mx-1 py-0 px-1 mb-1" onClick={ () => this.setLayoutSize(1) }>
                                <IoMdAdd />
                            </button>
                        </span>
                    </div>
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
        gourpsNbr: state.admin.groups.length
    });
}

export default withRouter(connect(mapStateToProps)(Admin));