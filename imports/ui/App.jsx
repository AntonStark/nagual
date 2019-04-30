import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data'

import { Canvas } from '/imports/ui/Canvas';
import { TableVariables } from "/imports/ui/Table";
import { Markers } from '../api/markers';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedId: undefined};
        this.setSelectedId = this.setSelectedId.bind(this);
    }
    setSelectedId(marker_id) {
        this.setState({selectedId: marker_id});
    }
    render() {
        const styleCanvas = {position: 'absolute', left: '100px'};
        const styleTable = {position: 'absolute', left: '1500px', top: '150px'};

        return (
            <div>
                <h1 style={{margin: '5px'}}>Nagual Project</h1>
                <div style={styleCanvas}>
                    <Canvas markers={this.props.markers}
                        handleSelectMarker={this.setSelectedId}
                        selectedMarkerId={this.state.selectedId}/>
                </div>
                <div style={styleTable}>
                    <TableVariables
                        selectedMarker={Markers.findOne({_id: this.state.selectedId})}/>
                </div>
            </div>
        );
    }
}

export default withTracker(() => ({
    markers: Markers.find({}).fetch()
}))(App);
