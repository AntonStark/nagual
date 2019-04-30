import React, { Component } from 'react'

export class TableRowAdding extends Component {
    constructor(props) {
        super(props);
        this.refNameField = React.createRef();
        this.refValueField = React.createRef();
        this.handlerNameField = this.handlerNameField.bind(this);
        this.handlerValueField = this.handlerValueField.bind(this);
    }
    handlerNameField(e) {
        if (e.key === 'Enter' || e.key === 'Tab') {
            this.refValueField.current.style.visibility = 'visible';
            this.refValueField.current.focus();
            e.preventDefault();
        }
    }
    handlerValueField(e) {
        if (e.key === 'Enter') {
            this.props.onAddVariable(this.props.selectedMarker,
                this.refNameField.current.value, this.refValueField.current.value);
            this.refNameField.current.value = '';
            this.refValueField.current.value = '';
            this.refNameField.current.focus();
        }
        else if (e.key === 'Escape') {
            this.refNameField.current.focus();
            this.refNameField.current.select();
        }
    }
    render() {
        return (
            <tr>
                <td><input type={'input'} placeholder={'добавить'}
                           ref={this.refNameField} onKeyDown={this.handlerNameField}/></td>
                <td><input type={'input'} placeholder={'значение'} style={{visibility: 'hidden'}}
                           ref={this.refValueField} onKeyDown={this.handlerValueField}/></td>
            </tr>
        )
    }
}
