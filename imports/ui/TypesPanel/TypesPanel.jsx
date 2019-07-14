import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data'

import { TypeItem } from './TypeItem';
import { AddTypeButton } from './AddTypeButton';

import { deleteType, MTypes, updateType } from '../../api/marker_types';

export class TypesPanelUI extends Component {
    constructor(props) {
        super(props);
    }

    isSelected(typeId) {
        return (typeId in this.props.selectedTypes
                ? this.props.selectedTypes[typeId]
                : true);
    }
    isActive(typeId) {
        return (typeId === this.props.activeTypeId);
    }
    static deleteType(typeId) {
        return deleteType(typeId);
    }

    render() {
        const typesItems = this.props.types.map(
            (markerTypeObj, i) =>
                <TypeItem name={markerTypeObj.name} color={markerTypeObj.color} key={i}
                          checked={this.isSelected(markerTypeObj._id)} active={this.isActive(markerTypeObj._id)}
                          registerSelf={() => this.props.registerType(markerTypeObj._id)}
                          handleTypeSelection={isSelected =>
                              this.props.handleTypeSelection(markerTypeObj._id, isSelected)}
                          handleTypeUpdating={(newName, newColor) => updateType(markerTypeObj._id, newName, newColor)}
                          handleTypeActivation={() => this.props.setActiveType(markerTypeObj._id)}/>
                );
        return (
            <div style={{padding: '0 4px'}}>
                <div style={{height: '850px', overflowX: 'hidden', overflowY: 'auto'}}>
                    <ul style={{listStyleType: 'none', padding: 0}}>
                        {typesItems}
                    </ul>
                </div>
                <AddTypeButton count={this.props.types.length}/>
            </div>
        );
    }
}

export const TypesPanel = withTracker(() => ({
    types: MTypes.find({}).fetch()
}))(TypesPanelUI);
