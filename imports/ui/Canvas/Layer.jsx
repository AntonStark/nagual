import React, { Component } from 'react'

export class Layer extends Component {
    constructor(props) {
        super(props);
        this.generateKeyDownHandler = this.generateKeyDownHandler.bind(this);
    }
    generateKeyDownHandler(marker) {
        return (event) => {
            if (event.key === 'Escape') {
                event.target.blur();
            }
            else if (event.key === 'Delete')
                this.props.onDeleteMarker(marker);
        };
    }
    render() {
        const style = {position: 'absolute'};
        const cF = this.props.canvasField;      // this.props.canvasFiled: {x, y, w, h}
        // this.props.boundingRect: {height, width, left, top, right, bottom, x, y}
        const bR = this.props.boundingRect;
        const markers = this.props.markers
            .filter(marker => {
                const x = marker.geometry.pos_x;
                const y = marker.geometry.pos_y;
                return (x >= cF.x && x <= cF.x + cF.w)
                    && (y >= cF.y && y <= cF.y + cF.h);
            })
            .map(marker => {
                const left = (marker.geometry.pos_x - cF.x) / cF.w * bR.width;
                const top = (marker.geometry.pos_y - cF.y) / cF.h * bR.height;
                return {
                    ...marker,
                    observed: {
                        pos_x: left,
                        pos_y: top
                    }
                }
            })
            .map(marker => <div
                key={marker._id}
                style={{position: 'absolute',
                    left: marker.observed.pos_x + 'px',
                    top: marker.observed.pos_y + 'px'}} tabIndex='0'
                className={this.props.selectedMarkerId
                && this.props.selectedMarkerId === marker._id ? 'marker selected' : 'marker'}
                onFocus={() => this.props.onMarkerSelection(marker._id)}
                // onBlur={() => this.props.onMarkerSelection(undefined)}
                onKeyDown={this.generateKeyDownHandler(marker)}/>
            );
        return (
            <div style={style}>
                {markers}
            </div>
        )
    }
}
