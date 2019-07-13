import React, { Component } from 'react';

export class TypeItem extends Component {
    constructor(props) {
        super(props);
        this.state = {editable: false};
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.saveButtonHandler = this.saveButtonHandler.bind(this);

        this.refTypeName = React.createRef();
        this.refColorR = React.createRef();
        this.refColorB = React.createRef();
        this.refColorG = React.createRef();
    }

    onChangeHandler(e) {
        this.props.handleTypeSelection(e.target.checked);
    }
    clickHandler(e) {
        if (e.ctrlKey || e.metaKey) {
            this.setState({editable: true});
        }
        else if (this.props.checked) {
            this.props.handleTypeActivation();
        }
    }
    saveButtonHandler() {
        const name = this.refTypeName.current.value;
        const cR = this.refColorR.current.value;
        const cG = this.refColorG.current.value;
        const cB = this.refColorB.current.value;
        this.props.handleTypeUpdating(name, [cR, cG, cB]);
        this.setState({editable: false});
    }

    render() {
        if (this.state.editable) {
            return (
                <li className="typesPanelItem">
                    <input ref={this.refTypeName} size="10" maxLength="32" defaultValue={this.props.name}/>
                    <br/>
                    <input ref={this.refColorR} defaultValue={this.props.color[0]}
                           size="3" maxLength="3" className="colorInputStyle" style={{borderColor: 'red'}}/>
                    <input ref={this.refColorG} defaultValue={this.props.color[1]}
                           size="3" maxLength="3" className="colorInputStyle" style={{borderColor: 'green'}}/>
                    <input ref={this.refColorB} defaultValue={this.props.color[2]}
                           size="3" maxLength="3" className="colorInputStyle" style={{borderColor: 'blue'}}/>
                    <button style={{fontSize: '8px'}} onClick={this.saveButtonHandler}>OK</button>
                </li>);
        } else {
            const actualColor = `rgb(${this.props.color[0]}, ${this.props.color[1]}, ${this.props.color[2]})`;
            return (
                <li className={(this.props.active ? 'typesPanelItem selectedTypesPanelItem' : 'typesPanelItem')}
                    style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}
                    onClick={this.clickHandler}>
                    {this.props.name}
                    <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <div className="marker" style={{background: actualColor, border: `2px solid ${actualColor}`}}/>
                        <input type="checkbox" checked={this.props.checked} onChange={this.onChangeHandler}/></div>
                </li>
            );
        }
    }

    componentDidMount() {
        this.props.registerSelf();
    }
}
