import React, { Component } from 'react'

import {BackgroundSVG} from "./BackgroundSVG";
import { Layer } from '/imports/ui/Canvas/Layer'
import { LockComponent } from "/imports/ui/LockComponent";

import { Markers } from "../../api/markers";

export class Canvas extends Component {
    constructor(props) {
        super(props);
        this.canvasFieldBase = {x: 1000, y: 1000, w: 1380, h: 900};
        this.state = {
            lock: true,
            wheelY: 0,
            canvasField: this.canvasFieldBase
        };

        this.handleLockToggle = this.handleLockToggle.bind(this);
        this.handleAddMarker = this.handleAddMarker.bind(this);
        this.handlerDeleteMarker = this.handlerDeleteMarker.bind(this);

        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleWheel = this.handleWheel.bind(this);
    }
    handleLockToggle(checked) {
        this.setState({lock: checked});
    }
    handleAddMarker(x, y) {
        if (!this.state.lock) {
            const addedId = Markers.insert({
                geometry: {pos_x: x, pos_y: y},
                data: {vars: []}
            });
            this.props.handleSelectMarker(addedId);
        }
        else
            console.log('canvas locked')
    }
    handlerDeleteMarker(marker) {
        if (!this.state.lock)
            Markers.remove({_id: marker._id});
        else
            console.log('canvas locked')
    }

    handleMouseMove(e) {
        this.mousePos = {left: e.pageX, top: e.pageY};
    }
    handleWheel(e) {
        const dY = e.deltaY;
        this.setState((prevState) => ({
            wheelY: prevState.wheelY - dY,
            canvasField: this.calcCanvasFiled(prevState.wheelY - dY)
        }));
        e.preventDefault();
    }

    calcCanvasFiled(actualWheelY) {
        // const wM = 3963;
        // const hM = 3308;
        const box = this.state.canvasField;
        const rect = this.props.boundingRect;
        const mouse = this.mousePos;
        if (!rect || !mouse)
            return `${box.x} ${box.y} ${box.w} ${box.h}`;

        const factor = 1 / Math.pow(1.006, actualWheelY);
        const width = this.canvasFieldBase.w * factor;
        // width = Math.min(wM, width);
        const height = this.canvasFieldBase.h * factor;
        // height = Math.min(hM, height);

        // (x_mouse - x_old) / width_old = (x_mouse - x_new) / width_new
        // x_mouse = x_old + (pageX - rect_left) / rect_width * width_old
        // x_new = x_mouse - (pageX - rect_left) / rect_width * width_new
        // x_new = x_old + (pageX - rect_left) / rect_width * ( width_old - width_new)
        const x = box.x + (mouse.left - rect.left) / rect.width * (box.w - width);
        // x = Math.max(0, x);
        const y = box.y + (mouse.top - rect.top) / rect.height * (box.h - height);
        // y = Math.max(0, y);

        return {x: x, y: y, w: width, h: height};
    }

    render() {
        const styleBackground = {display: 'inline-block'};
        const styleLock = {display: 'inline-block', position: 'absolute', margin: '10px'};

        const cF = this.state.canvasField;
        const nextCanvasFiled = `${cF.x} ${cF.y} ${cF.w} ${cF.h}`;

        return (
            <div onMouseMove={this.handleMouseMove} onWheel={this.handleWheel}>
                <Layer markers={this.props.markers} selectedMarkerId={this.props.selectedMarkerId}
                       onMarkerSelection={this.props.handleSelectMarker} onDeleteMarker={this.handlerDeleteMarker}/>
                <div style={styleBackground}>
                    <BackgroundSVG canvasField={nextCanvasFiled}/>
                </div>
                <div style={styleLock}>
                    <LockComponent lock={this.state.lock} onLockToggle={this.handleLockToggle}/>
                </div>
            </div>
        );
    }
}
