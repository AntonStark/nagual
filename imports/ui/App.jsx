import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data'

class App extends Component {
    render() {
        return (
            <h1>Hi men</h1>
        )
    }
}

export default withTracker(() => {
    return {};
})(App);
