import React, { Component } from 'react'

export class Layer extends Component {
    render() {
        const style = {position: 'absolute'};

        return (
            <div style={style}>
                <h2>Layer information</h2>
            </div>
        )
    }
}