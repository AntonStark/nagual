import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data'

import { Canvas, CanvasMarkers } from '/imports/ui/Canvas';
import { Table } from "/imports/ui/Table";

class App extends Component {
    render() {
        const styleCanvas = {position: 'absolute', left: '100px'};
        const styleTable = {position: 'absolute', right: '100px', top: '200px'};

        return (
            <div>
                <h1 style={{margin: '5px'}}>Nagual Project</h1>
                <div style={styleCanvas}>
                    <CanvasMarkers/>
                </div>
                <div style={styleTable}>
                    <Table/>
                </div>
            </div>
        );
    }
}

export default withTracker(() => {
    return {};
})(App);
