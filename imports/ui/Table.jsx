import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'

import { TableRow } from '/imports/ui/TableRow';
import { InputTableRow } from '/imports/ui/InputTableRow';

import { Variables } from '../api/variables'
import {Markers, isMarkerHasThatVar} from "../api/markers";

export class Table extends Component {
    constructor(props) {
        super(props);
    }

    static addVariable(marker, name, value) {
        if (!marker) {
            console.log('Marker not selected');
            return;
        }
        const curVariable = Variables.find({name: name});
        const varId = (curVariable.count() === 0
            ? Variables.insert({name: name, uses: []})
            : curVariable.fetch()[0]._id);
        Variables.update(varId, {$addToSet: {uses: marker._id}});

        if (!marker.data)
            marker.data = {vars: []};
        if (!isMarkerHasThatVar(marker, varId))
            Markers.update(marker._id, {$push: {'data.vars': {var_id: varId, value: value}}});
    }
    render() {
        const style = {textAlign: 'left'};
        const _marker = this.props.selectedMarker;
        if (!_marker)
            return null;
        if (!_marker.data)
            _marker.data = {vars: []};
        return (
            <div style={style}>
                <table>
                    <thead>
                    <tr><th>Variable</th><th>Value</th></tr>
                    </thead>
                    <tbody>
                    {_marker.data.vars.map(entry => (
                        <TableRow key={entry.var_id} entry={entry}/>)
                    )}
                    <InputTableRow selectedMarker={_marker} onAddVariable={Table.addVariable}/>
                    </tbody>
                </table>
            </div>
        )
    }
}

export const TableVariables = withTracker(() => ({
    variables: Variables.find({}).fetch()
}))(Table);
