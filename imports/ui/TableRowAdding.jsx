import React, { Component } from 'react'

import { isMarkerHasThatVar } from "../api/markers";
import { getVatiableId } from "../api/variables";

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
            const varId = getVatiableId(this.refNameField.current.value);
            if (varId && isMarkerHasThatVar(this.props.selectedMarker, varId)) {
                console.error('that var already in use on marker');
                return;
            }
            this.refValueField.current.style.display = 'inherit';
            this.refValueField.current.focus();
            e.preventDefault();
        }
    }
    handlerValueField(e) {
        const fieldName = this.refNameField.current;
        const fieldValue = this.refValueField.current;
        if (e.key === 'Enter') {
            this.props.onAddVariable(this.props.selectedMarker,
                fieldName.value, fieldValue.value);
            fieldName.value = '';
            fieldValue.value = '';
            this.refValueField.current.style.display = 'none';
            fieldName.focus();
        }
        else if (e.key === 'Escape') {
            fieldName.focus();
            fieldName.select();
        }
    }
    render() {
        return (
            <tr>
                <td><input type={'input'} placeholder={'добавить'}
                           ref={this.refNameField} onKeyDown={this.handlerNameField}/></td>
                <td><input type={'input'} placeholder={'значение'} style={{display: 'none'}}
                           ref={this.refValueField} onKeyDown={this.handlerValueField}/></td>
            </tr>
        )
    }
}
