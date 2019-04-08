import React, { Component } from 'react'

import { Foreground } from '/imports/ui/Foreground'
import { Layer } from '/imports/ui/Layer'

export class Canvas extends Component {

    render() {
        const style = {position: 'absolute', left: '130px'};

        return (
            <div style={style}>
                <Layer/>
                <Foreground/>
            </div>
        );
    }
}