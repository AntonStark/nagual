import React, { Component } from 'react'

import { Background } from '/imports/ui/Background'
import { Layer } from '/imports/ui/Layer'
import { LockComponent } from "/imports/ui/LockComponent";

import {Marker} from "../api/marker";

export class Canvas extends Component {
    constructor(props) {
        super(props);
        this.state = {lock: true, markers: []};
        this.state.markers.push(new Marker(20, 50));
        this.state.markers.push(new Marker(40, 50));
        this.handleLockToggle = this.handleLockToggle.bind(this);
    }
    handleLockToggle(checked) {
        this.setState({lock: checked});
    }
    render() {
        const styleBackground = {display: 'inline-block'};
        const styleLock = {display: 'inline-block', position: 'absolute'};

        return (
            <div>
                <Layer markers={this.state.markers}/>
                <div style={styleBackground}>
                    <Background/>
                </div>
                <div style={styleLock}>
                    <LockComponent lock={this.state.lock} onLockToggle={this.handleLockToggle}/>
                </div>
            </div>
        );
    }
}
