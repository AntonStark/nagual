import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data'

import { Canvas } from '/imports/ui/Canvas/Canvas';
import { TableVariables } from "/imports/ui/MarkerData/Table";

import { Markers } from '../api/markers';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMarkerId: undefined,
        };
        this.setSelectedMarkerId = this.setSelectedMarkerId.bind(this);
    }
    setSelectedMarkerId(marker_id) {
        this.setState({selectedMarkerId: marker_id});
    }
    render() {
        const styleCanvas = {position: 'absolute', left: '100px'};
        const styleMarkerTable = {position: 'absolute', left: '1500px', top: '150px'};

        return (
            <div>
                <h1 style={{margin: '5px'}}>Nagual Project</h1>
                <div style={styleCanvas}>
                    <Canvas markers={this.props.markers}
                            handleSelectMarker={this.setSelectedMarkerId}
                            selectedMarkerId={this.state.selectedMarkerId}/>
                </div>
                <div style={styleMarkerTable}>
                    <TableVariables selectedMarker={Markers.findOne({_id: this.state.selectedMarkerId})}/>
                </div>
            </div>
        );
    }
}

export default withTracker(() => ({
    markers: Markers.find({}).fetch()
}))(App);
