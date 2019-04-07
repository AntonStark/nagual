import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data'

import { Canvas } from '/imports/ui/Canvas';

class App extends Component {
    render() {
        return (
            <div>
                <h1>Hi men</h1>
                <Canvas/>
            </div>
        );
    }
}

export default withTracker(() => {
    return {};
})(App);
