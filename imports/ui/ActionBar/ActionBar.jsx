import React, { Component } from 'react'
import { LockComponent } from './LockComponent';

export class ActionBar extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <button className={"actionButton"}>Скачать CSV</button>
                <button className={"actionButton"}>Нумерация</button>
                <span className={"actionButton"}>
                    <LockComponent lock={this.props.canvasLock} onLockToggle={this.props.handleLockToggle}/>
                </span>
            </div>
        );
    }
}
