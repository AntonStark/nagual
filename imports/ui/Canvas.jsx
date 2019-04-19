import React, { Component } from 'react'

import { Background } from '/imports/ui/Background'
import { Layer } from '/imports/ui/Layer'
import { LockComponent } from "/imports/ui/LockComponent";

export class Canvas extends Component {
    constructor(props) {
        super(props);
        this.state = {lock: true};
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
                <Layer/>
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
