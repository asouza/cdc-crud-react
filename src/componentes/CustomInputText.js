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
				<span className="error">{this.state.msgErro}</span>			
			</div>
		);
	}

	componentDidMount() {
		PubSub.subscribe("erro-validacao",function(topicName,erro){			
			if(erro.field === this.props.name){
				this.setState({msgErro:erro.defaultMessage});			
			}
		}.bind(this));
		
		PubSub.subscribe("limpa-erros", function(topicName,msg){			
			this.setState({msgErro:""});
		}.bind(this));
	}	

	componentWillUnmount() {
		PubSub.unsubscribe("erro-validacao");
		PubSub.unsubscribe("limpa-erros");
	}
}