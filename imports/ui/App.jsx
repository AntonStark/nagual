import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data'

import { Canvas } from '/imports/ui/Canvas';

class App extends Component {
    render() {
        const styleCanvas = {position: 'absolute', left: '100px'};

        return (
            <div>
                <h1>Nagual Project</h1>
                <div style={styleCanvas}>
                    <Canvas/>
                </div>
            </div>
        );
    }
}

export default withTracker(() => {
    return {};
})(App);
