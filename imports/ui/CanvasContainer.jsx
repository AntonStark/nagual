import React, { PureComponent } from 'react'
import debounceRender from 'react-debounce-render';

import { Canvas } from './Canvas/Canvas';

export class CanvasContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {boundingRect: undefined};
        this.containerRef = React.createRef();
    }

    updateBoundingRect() {
        this.setState({
            boundingRect: this.containerRef.current.getBoundingClientRect()
        });
    }

    render() {
        const DebouncedCanvas = debounceRender(Canvas);
        return (
            <div ref={this.containerRef} style={{height: '100%'}}>
                <DebouncedCanvas
                    markers={this.props.markers}
                    canvasLock={this.props.canvasLock} showNumbering={this.props.showNumbering}
                    handleSelectMarker={this.props.handleSelectMarker} selectedMarkerId={this.props.selectedMarkerId}
                    boundingRect={this.state.boundingRect}
                />
            </div>
        );
    }

    componentDidMount() {
        this.updateBoundingRect();
        // window.addEventListener('resize', () => this.updateBoundingRect())
    }
}
