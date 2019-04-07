import React, { Component } from 'react'

import { Foreground } from '/imports/ui/Foreground'
import { Layer } from '/imports/ui/Layer'

export class Canvas extends Component {
    render() {
        return (
            <div>
                <Foreground/>
                <Layer/>
            </div>
        );
    }
}