import React, { Component } from 'react'
import { LockComponent } from './LockComponent';
import { ToggleNumbering } from './ToggleNumbering';

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
                    <LockComponent lock={this.props.canvasLock}
                                   toggleLock={this.props.toggleLock}/>
                </span>
                <span className={"actionButton"}>
                    <ToggleNumbering showNumbering={this.props.showNumbering}
                                     toggleNumbering={this.props.toggleNumbering}/>
                </span>
            </div>
        );
    }
}
