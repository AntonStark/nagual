import React, { Component } from 'react';

import { Variables } from '../../api/variables'
import { getValue } from '../../api/markers'

export class VariableTable extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const _var_id = this.props.variableId;
        if (!_var_id)
            return null;

        const variable = Variables.findOne(_var_id);
        if (!variable) {
            console.error('no such variable');
            return null;
        }

        const usesInfo = variable.uses.map(marker_id => (
           <tr key={marker_id}>
               <td onClick={() => this.props.onMarkerSelection(marker_id)}>
                   <div className={'tableRowActiveKey'}>{marker_id}</div>
               </td>
               <td>{getValue(marker_id, _var_id)}</td>
           </tr>
        ));
        return (
            <table>
                <thead>
                <tr><th>Marker</th><th>Value</th></tr>
                </thead>
                <tbody>
                {usesInfo}
                </tbody>
            </table>
        )
    }
}