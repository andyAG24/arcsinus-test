import React, { Component } from 'react';

export default class CustomInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: props.label,
            inputText: props.inputText,
            inputId: props.inputId,
            inputType: props.inputType,
            inputName: props.inputName
        };

        this.onChange = this.onChange.bind(this);
    }

    isLabeled() {
        return this.state.label == '' ? false : true;
    }

    onChange(ev) {
        this.state.value = ev.target.value;
        // this.props.inputValue = this.state.value;
        this.props.onChange(ev);
    }
    
    render() {
        return(
            <React.Fragment>
                <div className="custom-input">
                    { this.isLabeled && 
                        <label htmlFor={this.state.inputId}>{this.state.label}</label>
                    }
                    <input type={this.state.inputType} id={this.state.inputId} 
                        name={this.state.inputName} onChange={(ev) => this.onChange(ev)}>
                    </input>
                </div>
            </React.Fragment>
        );
    }
}