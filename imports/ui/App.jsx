import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data'

import { CanvasMarkers } from '/imports/ui/Canvas';
import { TableVariables } from "/imports/ui/Table";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedMarker: undefined};
        this.setSelectedMarker = this.setSelectedMarker.bind(this);
    }
    setSelectedMarker(marker) {
        this.setState({selectedMarker: marker});
    }
    render() {
        const styleCanvas = {position: 'absolute', left: '100px'};
        const styleTable = {position: 'absolute', left: '1500px', top: '150px'};

        return (
            <div>
                <h1 style={{margin: '5px'}}>Nagual Project</h1>
                <div style={styleCanvas}>
                    <CanvasMarkers
                        handleSelectMarker={this.setSelectedMarker}
                        selectedMarker={this.state.selectedMarker}/>
                </div>
                <div style={styleTable}>
                    <TableVariables
                        selectedMarker={this.state.selectedMarker}/>
                </div>
            </div>
        );
    }
}

export default withTracker(() => {
    return {};
})(App);
