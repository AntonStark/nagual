import React, { Component } from 'react'

export class ToggleNumbering extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.refCheckbox = React.createRef();
    }
    handleChange(e) {
        const newVal = (e.target.checked !== undefined ? e.target.checked : !this.refCheckbox.current.checked);
        this.props.toggleNumbering(newVal);
    }
    render() {
        return (
            <form onClick={this.handleChange}>
                <label>Отображать<br/>нумерацию</label>
                <input ref={this.refCheckbox} type="checkbox" name="numbering-checkbox"
                       checked={this.props.showNumbering} onChange={this.handleChange}/>
            </form>
        )
    }
}
