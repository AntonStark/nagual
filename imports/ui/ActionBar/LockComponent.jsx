import React, { Component } from 'react'

export class LockComponent extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.refCheckbox = React.createRef();
    }
    handleChange(e) {
        const newVal = (e.target.checked !== undefined ? e.target.checked : !this.refCheckbox.current.checked);
        this.props.toggleLock(newVal);
    }
    render() {
        return (
            <form onClick={this.handleChange}>
                <label>Блокировка<br/>расстановки</label>
                <input ref={this.refCheckbox} type="checkbox" name="lock-checkbox"
                       checked={this.props.lock} onChange={this.handleChange}/>
            </form>
        )
    }
}
