import React, { Component } from 'react'

import { Variables } from '../api/variables'

export class TableRow extends Component {
    constructor(props) {
        super(props);
        this.refValueField = React.createRef();
        this.state = {valueField: {disabled: true, value: props.entry.value}};
        this.clickHandler = this.clickHandler.bind(this);
        this.blurHandler = this.blurHandler.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }
    clickHandler() {
        this.setState(prevState => ({
            valueField: {
                ...prevState.valueField,
                disabled: false
            }
        }), () => this.refValueField.current.select());
    }
    blurHandler() {
        this.setState(prevState => ({
            valueField: {
                ...prevState.valueField,
                disabled: true
            }
        }));
        // todo update var value
        document.getSelection().empty();
    }
    keyDownHandler(e) {
        if (e.key === 'Escape' || e.key === 'Enter')
            this.blurHandler();
    }
    changeHandler(e) {
        const value = e.target.value;
        this.setState(prevState => ({
            valueField: {
                ...prevState.valueField,
                value: value
            }
        }));
    }
    render() {
        const _var = this.props.entry;
        return (
            <tr>
                <td>{Variables.findOne(_var.var_id).name}</td>
                <td onClick={this.clickHandler}>
                    <input disabled={this.state.valueField.disabled} value={this.state.valueField.value}
                           type={'text'} ref={this.refValueField}
                           onBlur={this.blurHandler} onKeyDown={this.keyDownHandler} onChange={this.changeHandler}/>
                </td>
            </tr>
        )
    }
}
