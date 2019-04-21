import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'

import { Background } from '/imports/ui/Background'
import { Layer } from '/imports/ui/Layer'
import { LockComponent } from "/imports/ui/LockComponent";

import { Markers } from "../api/markers";

export class Canvas extends Component {
    constructor(props) {
        super(props);
        this.state = {lock: true};
        this.handleLockToggle = this.handleLockToggle.bind(this);
        this.handleAddMarker = this.handleAddMarker.bind(this);
    }
    handleLockToggle(checked) {
        this.setState({lock: checked});
    }
    handleAddMarker(x, y) {
        if (!this.state.lock)
            Markers.insert({geometry: {pos_x: x, pos_y: y}});
        else
            console.log('canvas locked')
    }
    render() {
        const styleBackground = {display: 'inline-block'};
        const styleLock = {display: 'inline-block', position: 'absolute', margin: '10px'};

        return (
            <div>
                <Layer markers={this.props.markers}/>
                <div style={styleBackground}>
                    <Background add={this.handleAddMarker}/>
                </div>
                <div style={styleLock}>
                    <LockComponent lock={this.state.lock} onLockToggle={this.handleLockToggle}/>
                </div>
            </div>
        );
    }
}

export const CanvasMarkers = withTracker(() => ({
    markers: Markers.find({}).fetch()
}))(Canvas);
