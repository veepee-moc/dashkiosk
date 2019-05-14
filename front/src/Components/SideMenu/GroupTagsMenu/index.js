import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IoMdCheckmark, IoMdAdd } from 'react-icons/io';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import GroupTag from '../../GroupTag';

class GroupTagsMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.groupTags !== prevProps.groupTags)
            this.props.updateCollapse();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.Rest.addNewTag(this.state.inputValue);
        this.overlay.hide();
    }
    
    handleValueChanged = (event) => {
        this.setState({ inputValue: event.target.value });
    }

    renderGroupTags() {
        return this.props.groupTags.map((tag, key) =>
            <GroupTag value={ tag.name } tagid={ tag.id } key={ key } Rest={ this.props.Rest }/>
        );
    }

    render() {
        const popover = (
            <Popover style={{ zIndex: 1200 }}>
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group">
                        <input type="text" className="form-control form-control-sm"
                            value={this.state.inputValue} onChange={this.handleValueChanged} autoFocus />
                        <div className="input-group-append">
                            <button className="btn btn-primary btn-sm">
                                <IoMdCheckmark />
                            </button>
                        </div>
                    </div>
                </form>
            </Popover>
        );

        return (
            <div className="bg-light mx-auto sb-container-grouptags">
                <div className="m-1">
                    { this.renderGroupTags() }
                </div>
                <OverlayTrigger ref={(elem) => this.overlay = elem} trigger="click" rootClose placement="right" overlay={popover}>
                    <button className="btn btn-noframe-dark btn-sm d-block w-100 rounded-0 text-center">
                        <IoMdAdd style={{ fontSize: '20px' }} />
                    </button>
                </OverlayTrigger>
            </div>
        );
    }
};

function mapStateWithProps(state) {
    return {
        groupTags: state.admin.groupTags
    };
}

export default connect(mapStateWithProps)(GroupTagsMenu);