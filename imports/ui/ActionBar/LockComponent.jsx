import React, { Component } from 'react'

export class LockComponent extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.props.onLockToggle(e.target.checked);
    }
    render() {
        const lock = this.props.lock;
        return (
            <form onClick={() => this.props.onLockToggle(!this.props.lock)}>
                <label>Блокировка<br/>расстановки</label>
                <input type={'checkbox'} name={'lock-checkbox'} checked={lock} onChange={this.handleChange}/>
            </form>
        )
    }
}
