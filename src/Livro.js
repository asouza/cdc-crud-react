import $ from "jquery";
import CustomInputText from "./componentes/CustomInputText.js"
import CustomSubmit from "./componentes/CustomSubmit.js"
import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import TratadorDeErros from './TratadorDeErros'

class FormularioLivro extends Component {
	constructor(props) {
		super(props);
		this.state = {titulo: '', preco: '', autorId: ''};
		this.setTitulo = this.setTitulo.bind(this);
		this.setPreco = this.setPreco.bind(this);
		this.setAutorId = this.setAutorId.bind(this);		
		this.handleLivroSubmit = this.handleLivroSubmit.bind(this);
	}
	
	setTitulo(e) {
		this.setState({titulo: e.target.value});
	}

	setPreco(e) {
		this.setState({preco: e.target.value});
	}

	setAutorId(e) {
		this.setState({autorId: e.target.value});
	}
	
	
	handleLivroSubmit(e) {
		e.preventDefault();
		var titulo = this.state.titulo.trim();
		var preco = this.state.preco.trim();
		var autorId = this.state.autorId;

		$.ajax({
			url: this.props.url,
			contentType: 'application/json',
			dataType: 'json',
			type: 'POST',
			data: JSON.stringify({titulo:titulo,preco:preco,autorId:autorId}),
			success: function(data) {
		        PubSub.publish( 'atualiza-lista-livros', data );
				this.setState({titulo: '', preco: '', autorId: ''});
			}.bind(this),
			error: function(response){
				if(response.status === 400){
					var tratadorDeErros = new TratadorDeErros();
					tratadorDeErros.publicaErros(JSON.parse(response.responseText));						
				}
			},
      		beforeSend: function () {
        		PubSub.publish("limpa-erros");
      		}
		});  
	}
	
	render() {
		var autores = this.props.autores.map(function(autor){
			return <option key={autor.id} value={autor.id}>{autor.nome}</option>;
		});
		return (
			<div className="autorForm">
				<form className="pure-form pure-form-aligned" onSubmit={this.handleLivroSubmit}>
					<CustomInputText id="titulo" name="titulo" label="Titulo: " type="text" value={this.state.titulo} placeholder="Titulo do livro" onChange={this.setTitulo} />
					<CustomInputText id="preco" name="preco" label="Preco: " type="text" value={this.state.preco} placeholder="Preço do livro" onChange={this.setPreco} />
				    <div className="pure-control-group">
            			<label htmlFor="autorId">Autor</label>
						<select value={this.state.autorId} name="autorId" onChange={this.setAutorId}>
							<option value="">Selecione</option>
							{autores}
						</select>
					</div>
					<CustomSubmit label="Enviar" />
				</form>			        
			</div>
		);
	}
} 

class TabelaLivros extends Component {
	
	render() {
		var livros = this.props.lista.map(function(livro){
			return(
					<tr key={livro.id}>
						<td>{livro.titulo}</td>
						<td>{livro.autor.nome}</td>
						<td>{livro.preco}</td>
					</tr>
				);
			});
		return(
			<table className="pure-table">
				<thead>
					<tr>
						<th>Titulo</th>
						<th>Autor</th>
						<th>Preco</th>
					</tr>
				</thead>
				<tbody>
					{livros}
				</tbody>
			</table>
		);
	}
}

export default class LivroAdmin extends Component {
	constructor(props) {
		super(props);
		this.state = {lista : [],autores:[]};
	}

	componentDidMount() {
		$.ajax({
			url: "http://localhost:8080/api/livros",
			dataType: 'json',
			success: function(data) {
				this.setState({lista: data});
			}.bind(this)
		});
		
		$.ajax({
			url: "http://localhost:8080/api/autores",
			dataType: 'json',
			success: function(data) {
				this.setState({autores: data});
			}.bind(this)
		});

		PubSub.subscribe('atualiza-lista-livros', function(topicName,data){
			this.setState({lista:data});
		}.bind(this));		
	}

	componentWillUnmount() {
		PubSub.unsubscribe("atualiza-lista-livros");
	}

	render() {
		return(
			<div>
				<div className="header">
					<h1>Cadastro de Livros</h1>
				</div>
				<div className="content" id="content">
					<FormularioLivro url="http://localhost:8080/api/livros" autores={this.state.autores}/>
					<TabelaLivros lista={this.state.lista}/>
				</div>
			</div>
		);
	}
} 
