import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Display from '../Display';
import EditableText from '../EditableText';

class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Unassigned',
            description: 'Newly created group',
            displays: [],
            layoutSize: 3,
            inputTitle: false
        };
        this.updateGroupInfo = this.updateGroupInfo.bind(this);
    }

    updateGroupInfo() {
        if (this.props.group) {
            this.setState({
                title: this.props.group.name,
                description: this.props.group.description,
                displays: this.props.group.displays
            });
        }
    }

    renderDisplays() {
        var layoutSize = 0;
        const displays = [];
        for (const index in this.state.displays) {
            var i = Math.floor(layoutSize / this.state.layoutSize);
            if (!displays[i])
                displays[i] = [];
            displays[i].push(this.state.displays[index]);
            ++layoutSize;
        }
        return (
            displays.map((displaysToRender, index) => {
                return (
                    <div className="row" key={index}>
                        {displaysToRender.map((display) => {
                            return (
                                <div className="col-sm p-1" style={{maxWidth: 100 / this.state.layoutSize + '%'}} key={display.id}>
                                    <Display display={display} />
                                </div>
                            );
                        })}
                    </div>
                );
            })
        );
    }

    componentDidMount() {
        this.updateGroupInfo();
    }

    componentDidUpdate(prevProps) {
        if (this.props.group !== prevProps.group)
            this.updateGroupInfo();
    }

    render() {
        return (
            <div className="card">
                <div className="card-header pt-1 pr-2 pb-0 pl-2">
                    <EditableText className="card-title mb-0" text={ this.state.title } />
                    <EditableText className="card-subtitle text-muted m-0 mb-1" text={ this.state.description }  />
                </div>
                <div className="card-body pt-2 pb-2">
                    { this.renderDisplays() }
                </div>
                <div className="btn-group btn-group-sm">
                    <button type="button" className="btn btn-light w-50 border-right rounded-0">Add a new dashboard</button>
                    <button type="button" className="btn btn-light w-50 border-left rounded-0">Preview</button>
                </div>
            </div>
        );
    }
};

export default withRouter(Group);