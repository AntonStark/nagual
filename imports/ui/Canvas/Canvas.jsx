import React, { Component } from 'react'

import { Background } from '/imports/ui/Canvas/Background'
import { Layer } from '/imports/ui/Canvas/Layer'
import { LockComponent } from "/imports/ui/LockComponent";

import { Markers } from "../../api/markers";

export class Canvas extends Component {
    constructor(props) {
        super(props);
        this.state = {lock: true};
        this.handleLockToggle = this.handleLockToggle.bind(this);
        this.handleAddMarker = this.handleAddMarker.bind(this);
        this.handlerDeleteMarker = this.handlerDeleteMarker.bind(this);
    }
    handleLockToggle(checked) {
        this.setState({lock: checked});
    }
    handleAddMarker(x, y) {
        if (!this.state.lock) {
            const addedId = Markers.insert({
                geometry: {pos_x: x, pos_y: y},
                data: {vars: []}
            });
            this.props.handleSelectMarker(addedId);
        }
        else
            console.log('canvas locked')
    }
    handlerDeleteMarker(marker) {
        if (!this.state.lock)
            Markers.remove({_id: marker._id});
        else
            console.log('canvas locked')
    }
    render() {
        const styleBackground = {display: 'inline-block'};
        const styleLock = {display: 'inline-block', position: 'absolute', margin: '10px'};

        return (
            <div>
                <Layer markers={this.props.markers} selectedMarkerId={this.props.selectedMarkerId}
                       onMarkerSelection={this.props.handleSelectMarker} onDeleteMarker={this.handlerDeleteMarker}/>
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
