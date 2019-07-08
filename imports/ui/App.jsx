import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data'

import { ActionBar } from '/imports/ui/ActionBar/ActionBar';
import { CanvasContainer } from '/imports/ui/CanvasContainer';
import { TypesPanel } from './TypesPanel/TypesPanel';
// import { TableVariables } from "/imports/ui/MarkerData/Table";
// import { VariableTable } from '/imports/ui/MarkerData/VariableTable';

import { Markers } from '../api/markers';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMarkerId: undefined,
            selectedVariableId: undefined,
            canvasLock: true,
            selectedTypes: {},
        };
        this.setSelectedMarkerId = this.setSelectedMarkerId.bind(this);
        this.setSelectedVariableId = this.setSelectedVariableId.bind(this);
        this.handleLockToggle = this.handleLockToggle.bind(this);
        this.handleTypeSelection = this.handleTypeSelection.bind(this);

        this.refTypesPanel = React.createRef();
    }
    setSelectedMarkerId(marker_id) {
        this.setState({selectedMarkerId: marker_id});
    }
    setSelectedVariableId(var_id) {
        this.setState({selectedVariableId: var_id});
    }
    handleLockToggle(checked) {
        this.setState({canvasLock: checked});
    }
    handleTypeSelection(typeId, isSelected) {
        let selectedTypes = this.state.selectedTypes;
        selectedTypes[typeId] = isSelected;
        this.setState({selectedTypes: selectedTypes},
            () => this.refTypesPanel.current.forceUpdate()      // meteor withTracker seems to ignore changes in props
        );
    }
    render() {
        /*const styleCanvas = {position: 'absolute',
            borderBottom: 'solid 1px black', borderRight: 'solid 1px black',
            marginTop: '4px', marginLeft: '4px'};
        const styleMarkerTable = {position: 'absolute', left: '1400px', top: '150px', textAlign: 'left'};
        const styleVariableTable = {position: 'absolute', left: '1400px', top: '500px', textAlign: 'left'};
        const styleActionBar = {position: 'absolute', borderRight: 'solid 1px black',
            width: '1189px', height: '80px',
            top: '910px', left: '15px', marginTop: '4px'};

        return (
            <div>
                <div style={styleCanvas}>
                    <CanvasContainer width={1200} height={900} basePoint={{x: 0, y: 0}}
                                     markers={this.props.markers} canvasLock={this.state.canvasLock}
                                     handleSelectMarker={this.setSelectedMarkerId}
                                     selectedMarkerId={this.state.selectedMarkerId}/>
                </div>
                <div style={styleMarkerTable}>
                    <TableVariables onVariableSelect={this.setSelectedVariableId}
                                    selectedMarker={Markers.findOne({_id: this.state.selectedMarkerId})}/>
                </div>
                <div style={styleVariableTable}>
                    <VariableTable variableId={this.state.selectedVariableId}
                                   onMarkerSelection={this.setSelectedMarkerId}/>
                </div>
                <div style={styleActionBar}>
                    <ActionBar canvasLock={this.state.canvasLock} handleLockToggle={this.handleLockToggle}/>
                </div>
            </div>
        );*/
        // noinspection HtmlUnknownAttribute,HtmlDeprecatedAttribute
        return (
            <table style={{height: '100%', width: '100%'}} cols="3" cellPadding="0px" cellSpacing="1px">
                <tbody>
                <tr>
                    <td style={{width: '120px'}}>
                        <TypesPanel selectedTypes={this.state.selectedTypes} ref={this.refTypesPanel}
                                    handleTypeSelection={this.handleTypeSelection}/>
                    </td>
                    <td style={{width: '1200px'}}>
                        <CanvasContainer width={1200} height={900} basePoint={{x: 0, y: 0}}
                                         markers={this.props.markers} canvasLock={this.state.canvasLock}
                                         handleSelectMarker={this.setSelectedMarkerId}
                                         selectedMarkerId={this.state.selectedMarkerId}/>
                    </td>
                    <td style={{background: 'lightgrey'}}>data</td>
                </tr>
                <tr>
                   <td colSpan={3} style={{height: '60px'}}>
                       <ActionBar canvasLock={this.state.canvasLock} handleLockToggle={this.handleLockToggle}/>
                   </td>
                </tr>
                </tbody>
            </table>
        )
    }
}

export default withTracker(() => ({
    markers: Markers.find({}).fetch()
}))(App);
