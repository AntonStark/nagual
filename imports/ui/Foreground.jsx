import React, { Component } from 'react'

export class Foreground extends Component {
    render() {
        const style = {position: 'static'};

        return (
            <div style={style}>
                <img src={'/mock/losi.png'}/>
            </div>
        );
    }
}