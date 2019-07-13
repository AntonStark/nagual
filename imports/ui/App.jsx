import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data'

import { ActionBar } from '/imports/ui/ActionBar/ActionBar';
import { CanvasContainer } from '/imports/ui/CanvasContainer';
import { TypesPanel } from './TypesPanel/TypesPanel';
import  { DataTable } from './DataTable/DataTable';
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
            showNumbering: false,
            selectedTypes: {},
            activeTypeId: undefined,
        };
        this.setSelectedMarkerId = this.setSelectedMarkerId.bind(this);
        this.setSelectedVariableId = this.setSelectedVariableId.bind(this);
        this.toggleLock = this.toggleLock.bind(this);
        this.toggleNumbering = this.toggleNumbering.bind(this);
        this.handleTypeSelection = this.handleTypeSelection.bind(this);
        this.setActiveType = this.setActiveType.bind(this);
        this.dropActiveType = this.dropActiveType.bind(this);
        this.registerType = this.registerType.bind(this);

        this.refTypesPanel = React.createRef();
    }
    setSelectedMarkerId(marker_id) {
        this.setState({selectedMarkerId: marker_id});
    }
    setSelectedVariableId(var_id) {
        this.setState({selectedVariableId: var_id});
    }
    toggleLock(checked) {
        this.setState({canvasLock: checked});
    }
    toggleNumbering(toggle) {
        this.setState({showNumbering: toggle});
    }
    registerType(typeId, isSelected=true) {
        let selectedTypes = this.state.selectedTypes;
        selectedTypes[typeId] = isSelected;
        this.setState({selectedTypes: selectedTypes});
        return isSelected;
    }
    handleTypeSelection(typeId, isSelected) {
        if (typeId === this.state.activeTypeId)
            this.dropActiveType();

        let selectedTypes = this.state.selectedTypes;
        selectedTypes[typeId] = isSelected;
        this.setState({selectedTypes: selectedTypes},
            () => this.refTypesPanel.current.forceUpdate()      // meteor withTracker seems to ignore changes in props
        );
    }
    setActiveType(typeId) {
        if (!this.state.selectedTypes[typeId])
            return;

        this.setState(prevState => (
            prevState.selectedTypes[typeId]
                ? {activeTypeId: typeId}
                : null
        ));
    }
    dropActiveType() {
        this.setState({activeTypeId: undefined});
    }
    render() {
        // noinspection HtmlUnknownAttribute,HtmlDeprecatedAttribute
        return (
            <table id="mainLayoutTable" cols="3" cellPadding="0px" cellSpacing="1px">
                <tbody>
                <tr>
                    <td id="Container">
                        <TypesPanel ref={this.refTypesPanel}
                                    selectedTypes={this.state.selectedTypes} handleTypeSelection={this.handleTypeSelection}
                                    activeTypeId={this.state.activeTypeId} setActiveType={this.setActiveType}
                                    registerType={this.registerType}/>
                    </td>
                    <td id="canvasContainer">
                        <CanvasContainer width={1200} height={900} basePoint={{x: 0, y: 0}}
                                         markers={this.props.markers} canvasLock={this.state.canvasLock}
                                         handleSelectMarker={this.setSelectedMarkerId}
                                         selectedMarkerId={this.state.selectedMarkerId}/>
                    </td>
                    <td id="dataTableContainer">
                        <DataTable/>
                    </td>
                </tr>
                <tr>
                    <td id="actionBar" colSpan={3}>
                        <ActionBar canvasLock={this.state.canvasLock} toggleLock={this.toggleLock}
                                   showNumbering={this.state.showNumbering} toggleNumbering={this.toggleNumbering}/>
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
