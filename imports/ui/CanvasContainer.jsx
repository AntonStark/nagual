import React, { Component } from 'react'

import { Canvas } from './Canvas/Canvas';

export class CanvasContainer extends Component {
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
        this.boundingRect = undefined;
    }

    render() {
        return (
            <div ref={this.containerRef}>
                <Canvas markers={this.props.markers}
                        handleSelectMarker={this.props.handleSelectMarker}
                        selectedMarkerId={this.props.selectedMarkerId}
                        boundingRect={this.boundingRect}/>
            </div>
        );
    }

    componentDidMount() {
        this.boundingRect = this.containerRef.current.getBoundingClientRect();
    }
}
