import React from 'react';

export default class CustomSubmit extends React.Component {
	render() {
		return (
			<div className="pure-controls">
				<label></label>
				<input type="submit" className="pure-button pure-button-primary" value={this.props.label} />
			</div>
		); 
	}
}