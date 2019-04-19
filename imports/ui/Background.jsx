import React, { Component } from 'react'

export class Background extends Component {
    render() {
        const style = {position: 'static'};

        return (
            <div style={style}>
                <img src={'/mock/losi.png'} alt='background'/>
            </div>
        );
    }
}
