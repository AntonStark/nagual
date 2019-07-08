import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data'

import { TypeItem } from './TypeItem';
import { AddTypeButton } from './AddTypeButton';

import { MTypes } from '../../api/marker_types';

export class TypesPanelUI extends Component {
    constructor(props) {
        super(props);
    }

    isSelected(typeId) {
        return (typeId in this.props.selectedTypes
                ? this.props.selectedTypes[typeId]
                : true
        )
    }

    render() {
        const typesItems = this.props.types
            .map(
                (markerTypeObj, i) =>
                <TypeItem name={markerTypeObj.name} key={i}
                          checked={this.isSelected(markerTypeObj._id)} editable={false}
                          handleTypeSelection={isSelected =>
                              this.props.handleTypeSelection(markerTypeObj._id, isSelected)
                          }/>
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
