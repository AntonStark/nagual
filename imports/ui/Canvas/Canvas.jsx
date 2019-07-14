import React, { Component } from 'react'

import { BackgroundSVG } from "./BackgroundSVG";
import { Layer } from '/imports/ui/Canvas/Layer'

import { Markers } from "../../api/markers";

export class Canvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wheelY: 0,
            canvasField: {
                x: 0,
                y: 0,
                w: (props.boundingRect ? props.boundingRect.width : 0),
                h: (props.boundingRect ? props.boundingRect.height : 0)}
        };

        this.handleAddMarker = this.handleAddMarker.bind(this);
        this.handlerDeleteMarker = this.handlerDeleteMarker.bind(this);

        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleWheel = this.handleWheel.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }

    handleAddMarker(x, y) {
        if (!this.props.canvasLock) {
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
        if (!this.props.canvasLock)
            Markers.remove({_id: marker._id});
        else
            console.log('canvas locked')
    }

    handleMouseMove(e) {
        this.mousePos = {left: e.pageX, top: e.pageY};

        if (this.anchorPoint) {
            const rect = this.props.boundingRect;
            this.setState(prevState => ({
                canvasField: {...prevState.canvasField,
                    x: this.anchorCanvasFiled.x
                        + (this.anchorPoint.left - this.mousePos.left) / rect.width * this.anchorCanvasFiled.w,
                    y: this.anchorCanvasFiled.y
                        + (this.anchorPoint.top - this.mousePos.top) / rect.height * this.anchorCanvasFiled.h
                }
            }));
        }
    }
    handleWheel(e) {
        if (this.anchorPoint) {
            e.preventDefault();
            return;
        }

        const dY = e.deltaY;
        this.setState((prevState) => ({
            wheelY: prevState.wheelY - dY,
            canvasField: this.calcCanvasFiled(prevState.wheelY - dY)
        }));
        e.preventDefault();
    }
    handleMouseDown(e) {
        this.anchorPoint = {left: e.pageX, top: e.pageY};
        this.anchorCanvasFiled = this.state.canvasField;
    }
    handleMouseUp() {
        this.anchorPoint = undefined;
        this.anchorCanvasFiled = undefined;
    }

    calcCanvasFiled(actualWheelY) {
        // const wM = 3963;
        // const hM = 3308;
        const box = this.state.canvasField;
        const rect = this.props.boundingRect;
        const mouse = this.mousePos;
        if (!mouse)
            return `${box.x} ${box.y} ${box.w} ${box.h}`;

        const factor = 1 / Math.pow(1.006, actualWheelY);
        const width = rect.width * factor;
        // width = Math.min(wM, width);
        const height = rect.height * factor;
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
        if (!this.props.boundingRect)
            return null;

        const cF = this.state.canvasField;
        const nextCanvasFiled = `${cF.x} ${cF.y} ${cF.w} ${cF.h}`;

        return (
            <div onMouseMove={this.handleMouseMove} onWheel={this.handleWheel}
                 onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
                <Layer canvasField={this.state.canvasField} boundingRect={this.props.boundingRect}
                       markers={this.props.markers} selectedMarkerId={this.props.selectedMarkerId}
                       onMarkerSelection={this.props.handleSelectMarker} onDeleteMarker={this.handlerDeleteMarker}/>
                <div style={{display: 'inline-block'}}>
                    <BackgroundSVG canvasField={nextCanvasFiled}
                                   width={this.props.boundingRect.width} height={this.props.boundingRect.height}/>
                </div>
            </div>
        );
    }
}
