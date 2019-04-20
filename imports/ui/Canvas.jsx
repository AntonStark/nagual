import React, { Component } from 'react'

import { Background } from '/imports/ui/Background'
import { Layer } from '/imports/ui/Layer'
import { LockComponent } from "/imports/ui/LockComponent";

import {Marker} from "../api/marker";

export class Canvas extends Component {
    constructor(props) {
        super(props);
        this.state = {lock: true, markers: []};
        this.state.markers = [];
        this.handleLockToggle = this.handleLockToggle.bind(this);
        this.handleAddMarker = this.handleAddMarker.bind(this);
    }
    handleLockToggle(checked) {
        this.setState({lock: checked});
    }
    handleAddMarker(x, y) {
        this.setState(state => ({markers: state.markers.concat(new Marker(x, y))}));
    }
    render() {
        const styleBackground = {display: 'inline-block'};
        const styleLock = {display: 'inline-block', position: 'absolute', margin: '10px'};

        return (
            <div>
                <Layer markers={this.state.markers}/>
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
