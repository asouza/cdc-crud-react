import React from 'react';
import PubSub from 'pubsub-js';

export default class CustomInputText extends React.Component {

	constructor(props) {
		super(props);
		this.state = {msgErro: ''};
	}

	render() {
		return (
			<div className="pure-control-group">
				<label htmlFor={this.props.id}>{this.props.label}</label> 
				<input {...this.props}/>				
				<span className="erro" id={"erro-"+this.props.name}>{this.state.msgErro}</span>					
			</div>
		);
	}

	componentDidMount() {
		PubSub.subscribe('erro-validacao-'+this.props.name, function(topicName,msg){			
			this.setState({msgErro:msg});
		}.bind(this));
		
		PubSub.subscribe("limpa-erros", function(topicName,msg){			
			this.setState({msgErro:""});
		}.bind(this));
	}	
}