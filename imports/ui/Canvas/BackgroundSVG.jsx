import React, {Component} from 'react'

export class BackgroundSVG extends Component {
    constructor(props) {
        super(props);
        this.state = {scale: 1., wheelY: 0};
        this.svgRef = React.createRef();
        this.svgRect = undefined;
        this.svgBoxStart = {x: 1000, y: 1000, w: 1380, h: 900};
        this.svgBox = this.svgBoxStart;
        this.mousePos = undefined;

        this.wheelHandler = this.wheelHandler.bind(this);
        this.calcViewBox = this.calcViewBox.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }

    wheelHandler(e) {
        const dY = e.deltaY;
        this.setState((prevState) => ({
            wheelY: prevState.wheelY + dY
        }));

        e.preventDefault();
    }
    calcViewBox() {
        // const wM = 3963;
        // const hM = 3308;
        const box = this.svgBox;
        const rect = this.svgRect;
        const mouse = this.mousePos;
        if (!rect || !mouse)
            return `${box.x} ${box.y} ${box.w} ${box.h}`;

        const factor = 1 / Math.pow(1.006, this.state.wheelY);
        const width = this.svgBoxStart.w * factor;
        // width = Math.min(wM, width);
        const height = this.svgBoxStart.h * factor;
        // height = Math.min(hM, height);

        // (x_mouse - x_old) / width_old = (x_mouse - x_new) / width_new
        // x_mouse = x_old + (pageX - rect_left) / rect_width * width_old
        // x_new = x_mouse - (pageX - rect_left) / rect_width * width_new
        // x_new = x_old + (pageX - rect_left) / rect_width * ( width_old - width_new)
        const x = box.x + (mouse[0] - rect.left) / rect.width * (box.w - width);
        // x = Math.max(0, x);
        const y = box.y + (mouse[1] - rect.top) / rect.height * (box.h - height);
        // y = Math.max(0, y);

        this.svgBox = {x: x, y: y, w: width, h: height};
        return `${x} ${y} ${width} ${height}`;
    }
    handleMouseMove(e) {
        this.mousePos = [e.pageX, e.pageY];
    }

    render() {
        const style = {position: 'static'};

        return (
            <div style={style} onWheel={this.wheelHandler}>
                <svg ref={this.svgRef} viewBox={this.calcViewBox()} width={1380} height={900} onMouseMove={this.handleMouseMove}>
                    <image x={0} y={0} width={3963} height={3308} xlinkHref={'/mock/kremlin_test-01.jpg'}/>
                </svg>
            </div>
        );
    }

    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        return true;
    }
    componentDidMount(): void {
        this.svgRect = this.svgRef.current.getBoundingClientRect();
    }
}
