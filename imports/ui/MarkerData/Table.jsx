import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'

import { TableRow } from '/imports/ui/MarkerData/TableRow';
import { TableRowAdding } from '/imports/ui/MarkerData/TableRowAdding';

import { Variables, getVatiableId } from '../../api/variables'
import { Markers, isMarkerHasThatVar } from "../../api/markers";

export class Table extends Component {
    constructor(props) {
        super(props);
    }

    static addVariable(marker, name, value) {
        if (!marker) {
            console.log('marker not selected');
            return;
        }
        if (value === '') {
            console.error('empty value not allowed');
            return;
        }
        let varId = getVatiableId(name);
        if (!varId)
            varId = Variables.insert({name: name, uses: []});

        if (!isMarkerHasThatVar(marker, varId)) {
            Markers.update(marker._id, {$push: {'data.vars': {var_id: varId, value: value}}});
            Variables.update(varId, {$addToSet: {uses: marker._id}});
            console.log('variable added')
        }
        else
            console.error('that var already in use on marker');
    }
    static updateVariable(markerId, varId, newValue) {
        if (newValue === '') {
            Table.deleteVariableValue(markerId, varId);
            return;
        }

        const oldVars = Markers.findOne(markerId).data.vars;
        for(let v in oldVars) {
            if (oldVars[v].var_id === varId) {
                const query = 'data.vars.' + v + '.value';
                Markers.update(markerId, {$set: {[query]: newValue}});
            }
        }
    }
    static deleteVariableValue(markerId, varId) {
        Markers.update(markerId, {$pull: {'data.vars': {var_id: varId}}});
        Variables.update(varId, {$pull: {uses: markerId}});
    }
    render() {
        const style = {textAlign: 'left'};
        const _marker = this.props.selectedMarker;
        if (!_marker)
            return null;
        if (!_marker.data)
            _marker.data = {vars: []};
        const tableOrdinaryRows = _marker.data.vars.map(entry => (
            <TableRow key={entry.var_id} entry={entry} onVariableSelect={this.props.onVariableSelect}
                      onVariableUpdate={Table.updateVariable.bind(null, _marker._id, entry.var_id)}/>)
        );
        return (
            <div style={style}>
                <table key={_marker._id} className={'markerTable'}>
                    {/*table.key with TableRow.key express (marker._id, var._id) unique constraint*/}
                    <thead>
                    <tr><th>Variable</th><th>Value</th></tr>
                    </thead>
                    <tbody>
                    {tableOrdinaryRows}
                    <TableRowAdding selectedMarker={_marker} onAddVariable={Table.addVariable}/>
                    </tbody>
                </table>
            </div>
        )
    }
}

export const TableVariables = withTracker(() => ({
    variables: Variables.find({}).fetch()
}))(Table);
