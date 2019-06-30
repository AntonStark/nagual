import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data'

import { CanvasContainer } from '/imports/ui/CanvasContainer';
import { TableVariables } from "/imports/ui/MarkerData/Table";
import { VariableTable } from '/imports/ui/VariableTable/VariableTable';

import { Markers } from '../api/markers';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMarkerId: undefined,
            selectedVariableId: undefined
        };
        this.setSelectedMarkerId = this.setSelectedMarkerId.bind(this);
        this.setSelectedVariableId = this.setSelectedVariableId.bind(this);
    }
    setSelectedMarkerId(marker_id) {
        this.setState({selectedMarkerId: marker_id});
    }
    setSelectedVariableId(var_id) {
        this.setState({selectedVariableId: var_id});
    }
    render() {
        const styleCanvas = {position: 'absolute', left: '100px'};
        const styleMarkerTable = {position: 'absolute', left: '1500px', top: '150px', textAlign: 'left'};
        const styleVariableTable = {position: 'absolute', left: '1500px', top: '500px', textAlign: 'left'};

        return (
            <div>
                <div style={styleCanvas}>
                    <CanvasContainer markers={this.props.markers}
                                     handleSelectMarker={this.setSelectedMarkerId}
                                     selectedMarkerId={this.state.selectedMarkerId}/>
                </div>
                <div style={styleMarkerTable}>
                    <TableVariables onVariableSelect={this.setSelectedVariableId}
                                    selectedMarker={Markers.findOne({_id: this.state.selectedMarkerId})}/>
                </div>
                <div style={styleVariableTable}>
                    <VariableTable variableId={this.state.selectedVariableId}
                                   onMarkerSelection={this.setSelectedMarkerId}/>
                </div>
            </div>
        );
    }
}

export default withTracker(() => ({
    markers: Markers.find({}).fetch()
}))(App);
