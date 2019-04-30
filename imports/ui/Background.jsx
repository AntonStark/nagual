import React, { Component } from 'react'

export class Background extends Component {
    constructor(props) {
        super(props);
        this.handleAddMarker = this.handleAddMarker.bind(this);
        this.backgroundRef = React.createRef();
    }
    handleAddMarker(e) {
        const box = this.backgroundRef.current.getBoundingClientRect();
        const left = (e.clientX - box.left);
        const top = (e.clientY - box.top);
        this.props.add(left, top);
    }

    render() {
        const style = {position: 'static'};

        return (
            <div style={style}>
                <img src={'/mock/losi.png'} alt='background' className={'mapBackground'}
                     ref={this.backgroundRef} onClick={this.handleAddMarker}/>
            </div>
        );
    }
}
