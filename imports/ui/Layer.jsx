import React, { Component } from 'react'
import PropTypes from "prop-types";
import {Marker} from "../api/marker";

export class Layer extends Component {
    render() {
        const style = {position: 'absolute'};
        const markers = this.props.markers.map(marker =>
            <div key={marker._id}
                 style={{position: 'absolute',
                     left: marker.geometry.pos_x + 'px',
                     top: marker.geometry.pos_y + 'px'}} className='marker'
                 onClick={() => this.props.onMarkerSelection(marker)}/>
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
