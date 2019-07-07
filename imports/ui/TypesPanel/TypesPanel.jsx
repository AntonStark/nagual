import React, { Component } from 'react';

import { TypeItem } from './TypeItem';
import { AddTypeButton } from './AddTypeButton';

export class TypesPanel extends Component {
    render() {
        return (
            <div style={{padding: '0 4px'}}>
                <div style={{height: '850px', overflowX: 'hidden', overflowY: 'auto'}}>
                    <ul style={{listStyleType: 'none', padding: 0}}>
                        <TypeItem name={'type1'} checked={false}/>
                        <TypeItem name={'type2'} checked={true}/>
                        <TypeItem name={'type3'} checked={false}/>
                        <TypeItem name={'type4'} checked={false}/>
                    </ul>
                </div>
                <AddTypeButton/>
            </div>
        );
    }
}