import React, { Component } from 'react'

export class BackgroundSVG extends Component {
    constructor(props) {
        super(props);
        this.state = {scale: 1.};
        this.svgRef = React.createRef();
        this.wheelHandler = this.wheelHandler.bind(this);
    }

    wheelHandler(e) {
        const dY = e.deltaY;
        function multiply(prevScale, deltaY) {
            return prevScale * Math.pow(1.006, deltaY);
        }
        this.setState((prevState) => ({
            scale: multiply(prevState.scale, dY)
        }));
        e.preventDefault();
    }

    calcViewBox() {
        const x0 = 1000;
        const y0 = 1000;
        const w0 = 1380;
        const h0 = 900;
        // x0 + w0 / 2 == xS + wS / 2 -> xS = x0 + (w0 - wS) / 2
        const x = x0 + (w0 - w0 / this.state.scale) / 2;
        const y = y0 + (h0 - h0 / this.state.scale) / 2;
        const width = w0 / this.state.scale;
        const height = h0 / this.state.scale;
        return `${x} ${y} ${width} ${height}`;
    }

    render() {
        const style = {position: 'static'};

        return (
            <div style={style} onWheel={this.wheelHandler}>
                <svg ref={this.svgRef} viewBox={this.calcViewBox()} width={1380} height={900}>
                    <image x={0} y={0} width={3963} height={3308} xlinkHref={'/mock/kremlin_test-01.jpg'}/>
                </svg>
            </div>
        );
    }
}
