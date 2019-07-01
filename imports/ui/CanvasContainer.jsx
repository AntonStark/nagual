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
                <Canvas width={this.props.width} height={this.props.height} basePoint={this.props.basePoint}
                        markers={this.props.markers} canvasLock={this.props.canvasLock}
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
