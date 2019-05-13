import React, { Component } from 'react';
import { connect } from 'react-redux';
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

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.Rest.addNewTag(this.state.inputValue);
    }
    
    handleValueChanged = (event) => {
        this.setState({ inputValue: event.target.value });
    }

    renderGroupTags() {
        return this.props.groupTags.map((tag, key) =>
            <GroupTag value={ tag.name } tagId={ tag.id } key={ key } onClick={ this.props.Rest.deleteTag }/>
        );
    }

    render() {
        const popover = (
            <Popover style={{ zIndex: 1200 }}>
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group">
                        <input type="text" className="form-control form-control-sm"
                            value={this.state.inputValue} onChange={this.handleValueChanged} />
                        <div className="input-group-append">
                            <button className="btn btn-primary btn-sm" onClick={this.handleSubmit}>
                                <IoMdCheckmark />
                            </button>
                        </div>
                    </div>
                </form>
            </Popover>
        );

        return (
            <div>
                <div className="m-1">
                    { renderGroupTags() }
                </div>
                <OverlayTrigger trigger="click" rootClose placement="right" overlay={popover}>
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