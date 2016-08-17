import React from 'react';

export default class CustomInputText extends React.Component {	
	render() {
		return (
			<div className="pure-control-group">
				<label htmlFor={this.props.id}>{this.props.label}</label> 
				<input id={this.props.id} type={this.props.type} name={this.props.name}
					value={this.props.value} placeholder={this.props.placeholder}/>				
			</div>
		);
	}
}