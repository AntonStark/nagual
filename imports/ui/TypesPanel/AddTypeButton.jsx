import React, { Component } from 'react'

import { addType } from '../../api/marker_types';

export class AddTypeButton extends Component {
    constructor(props) {
        super(props);
        this.addTypeHandler = this.addTypeHandler.bind(this);
    }

    addTypeHandler() {
        addType(`Type${this.props.count + 1}`, [0, 0, 0]);
    }
    render() {
        return (
            <div style={{border: '1px solid black', padding: '4px 8px', margin: '2px 0',
                fontSize: '24px', fontWeight: 'bold', textAlign: 'center'}}
                 onClick={this.addTypeHandler}>+</div>
        );
    }
}
