import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IoMdPricetag, IoMdGrid, IoMdAdd, IoMdRemove } from 'react-icons/io';
import GroupTag from '../../../GroupTag';
import Rest from '../../Rest';

class GroupMenu extends Component {
    constructor(props) {
        super(props);
        this.Rest = new Rest(this.props.groupIndex);
    }

    componentDidUpdate(prevProps) {
        if (this.props.tags !== prevProps.tags)
            this.props.updateCollapse();
    }

    setLayoutSize = (incr) => {
        this.Rest.updadeGroupLayoutSize(this.props.layoutSize + incr);
    }

    renderTags() {
        return this.props.tags.map((tag, key) =>
            <GroupTag value={tag.name} tagId={tag.id} key={key} />
        );
    }

    render() {
        return(
            <ul className="container nav flex-column px-0 text-left bg-white">
                <li className="nav-item">
                    <p className="font-weight-bold m-0 ml-2 mt-1">
                        <IoMdPricetag /> Tags
                            </p>
                    <div className="p-1 text-center">
                        {this.renderTags()}
                    </div>
                </li>
                <li className="nav-item border-bottom">
                    <p className="font-weight-bold m-0 ml-2 mt-1">
                        <IoMdGrid /> Layout Size
                            </p>
                    <div className="p-2 text-center">
                        <span className="border rounded p-1 ml-1 bg-white text-dark">
                            <button className="btn btn-noframe-dark btn-sm mx-1 py-0 px-1 mb-1"
                              onClick={() => this.setLayoutSize(-1)}>
                                <IoMdRemove />
                            </button>
                            {this.props.layoutSize}
                            <button className="btn btn-noframe-dark btn-sm mx-1 py-0 px-1 mb-1"
                              onClick={() => this.setLayoutSize(1)}>
                                <IoMdAdd />
                            </button>
                        </span>
                    </div>
                </li>
            </ul>
        );
    }
};

function mapStateToProps(state, ownProps) {
    const group = state.admin.groups[ownProps.groupIndex];
    if (!group)
        return { layoutSize: 3, tags: [] }
    const tags = [];
    for (const tag of state.admin.groupTags)
        if (tag.groups && tag.groups.find((id) => id === `${group.id}`))
            tags.push(tag);
    return {
        layoutSize: group.layoutSize,
        tags: tags
    };
}

export default connect(mapStateToProps)(GroupMenu);