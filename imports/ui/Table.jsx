import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'

import { Variables } from '../api/variables'
import {Markers, isMarkerHasThatVar} from "../api/markers";

export class Table extends Component {
    constructor(props) {
        super(props);
        this.refNameField = React.createRef();
        this.refValueField = React.createRef();
        this.handlerNameField = this.handlerNameField.bind(this);
        this.handlerValueField = this.handlerValueField.bind(this);
    }
    handlerNameField(e) {
        console.log(e.type);
        if (e.key === 'Enter') {
            this.refValueField.current.style.visibility = 'visible';
            this.refValueField.current.focus();
        }
    }
    handlerValueField(e) {
        if (e.key === 'Enter') {
            this.addVariable(this.props.selectedMarker,
                this.refNameField.current.value, this.refValueField.current.value);
        }
    }
    addVariable(marker, name, value) {
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
        const dataRows = (this.props.selectedMarker
            ? this.props.selectedMarker.data.vars.map(entry => (
                <tr key={entry.var_id}>
                    <td>{Variables.findOne(entry.var_id).name}</td>
                    <td>{entry.value}</td>
                </tr>
            ))
            : <tr></tr>);
        return (
            <div style={style}>
                <table>
                    <thead>
                    <tr>
                        <th>Variable</th>
                        <th>Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dataRows}
                    {/*todo выделить строчку добавления в отдельнй компонент*/}
                    <tr>
                        <td><input type={'input'} placeholder={'добавить'} style={{width: '120px'}}
                                   ref={this.refNameField} onKeyPress={this.handlerNameField}/></td>
                        <td><input type={'input'} placeholder={'значение'} style={{width: '120px', visibility: 'hidden'}}
                                   ref={this.refValueField} onKeyPress={this.handlerValueField}/></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export const TableVariables = withTracker(() => ({
    variables: Variables.find({}).fetch()
}))(Table);
