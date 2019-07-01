import React, {Component} from 'react'

export class BackgroundSVG extends Component {
    constructor(props) {
        super(props);
        this.svgRef = React.createRef();
    }

    render() {
        const style = {position: 'static'};

        return (
            <div style={style}>
                <svg ref={this.svgRef} viewBox={this.props.canvasField}
                     width={this.props.width} height={this.props.height}>
                    <image x={0} y={0} width={3963} height={3308} xlinkHref={'/mock/kremlin_test-01.jpg'}/>
                </svg>
            </div>
        );
    }
}
