import React, { Component } from 'react'
import PropTypes from "prop-types";

import {Marker} from "../api/marker";

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
        const markers = this.props.markers.map(marker =>
            <div key={marker._id}
                 style={{position: 'absolute',
                     left: marker.geometry.pos_x + 'px',
                     top: marker.geometry.pos_y + 'px'}} tabIndex='0'
                 className={this.props.selectedMarker
                      && this.props.selectedMarker._id === marker._id ? 'marker selected' : 'marker'}
                 onFocus={() => this.props.onMarkerSelection(marker)}
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

Layer.propTypes = {
    markers: PropTypes.arrayOf(Marker),
};
