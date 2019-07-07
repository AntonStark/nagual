import React, { Component } from 'react';

export class TypeItem extends Component {
    render() {
        return (
            <li style={{border: '1px solid black', padding: '4px 8px', margin: '2px 0'}}>
                {this.props.name}
                <input type="checkbox" checked={this.props.checked} style={{float: 'right'}}/>
            </li>
        );
    }
}
