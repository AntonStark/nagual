import React, { Component } from 'react'

export class BackgroundSVG extends Component {
    render() {
        const style = {position: 'static'};

        return (
            <div style={style}>
                <svg viewBox={'0 600 460 300'} width={1380} height={900}>
                    <image x={0} y={0} width={1375} height={931} xlinkHref={'/mock/losi.png'}/>
                </svg>
            </div>
        );
    }
}
