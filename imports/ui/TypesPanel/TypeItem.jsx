import React, { Component } from 'react';

export class TypeItem extends Component {
    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(e) {
        if (this.props.checked && (e.ctrlKey || e.metaKey)) {
            console.log('click');
        } else
            this.props.handleTypeSelection(!this.props.checked);
    }

    render() {
        if (this.props.editable) {
            return (<li>?</li>);
        } else {
            return (
                <li style={{border: '1px solid black', padding: '4px 8px', margin: '2px 0'}}
                    onClick={this.clickHandler}>
                    {this.props.name}
                    <input type="checkbox" checked={this.props.checked} style={{float: 'right'}}/>
                </li>
            );
        }
    }
}
