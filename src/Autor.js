import $ from "jquery";
import CustomInputText from './componentes/CustomInputText'
import CustomSubmit from './componentes/CustomSubmit'
import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import TratadorDeErros from './TratadorDeErros'

class FormularioAutor extends Component {

	
  constructor() {   
    super(); 
    this.state = {nome: '', email: '', senha: ''};
    this.handleSubmit = this.handleSubmit.bind(this);    
  }  

  salvaAlteracao(nomeInput,e) {
    this.setState({[nomeInput]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    var nome = this.state.nome.trim();
    var email = this.state.email.trim();
    var senha = this.state.senha.trim();    

    $.ajax({
      url: "http://localhost:8080/api/autores",
      contentType: 'application/json',
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify({nome:nome,email:email,senha:senha}),
      success: function(data) {
        PubSub.publish('atualiza-lista-autores', data);
        this.setState({nome:'',email:'',senha:''});
      }.bind(this),
      error: function(response){
        if(response.status === 400){
          new TratadorDeErros().publicaErros(JSON.parse(response.responseText));
        }
      },
      beforeSend: function () {
        PubSub.publish("limpa-erros");
      }
    });    
  }    		
	

	render() {
		return (
              <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit}>
                  <CustomInputText id="nome" name="nome" label="Nome: " type="text" value={this.state.nome} placeholder="Nome do Autor" onChange={this.salvaAlteracao.bind(this,'nome')} />
                  <CustomInputText id="email" name="email" label="Email: " type="email" value={this.state.email} placeholder="Email do Autor" onChange={this.salvaAlteracao.bind(this,'email')} />
                  <CustomInputText id="senha" name="senha" label="Senha: " type="password" value={this.state.senha} placeholder="Senha do Autor" onChange={this.salvaAlteracao.bind(this,'senha')}/>
                  <CustomSubmit label="Enviar" />
                </form>

              </div>  			
		);
	}
}

class TabelaAutores extends Component {
	render(){
         return (<div>            
            <table className="pure-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                  {
                    this.props.lista.map(function(autor){
                      return (
                          <tr key={autor.id}>
                            <td>{autor.nome}</td>                
                            <td>{autor.email}</td>                                              
                          </tr>
                      );
                    })}                    
              </tbody>
            </table> 
          </div>);             		
	}
}

export default class AutorAdmin extends Component {

	constructor() {   
	   super(); 
	   this.state = {lista : []};	   
	}

  componentDidMount() {
    $.ajax({
      url: "http://localhost:8080/api/autores",
      dataType: 'json',
      success: function(data) {
        this.setState({lista: data});
      }.bind(this)
    });

	PubSub.subscribe('atualiza-lista-autores', function(topico,novaLista){
		this.setState({lista:novaLista});
	}.bind(this));    
  }   

  componentWillUnmount() {
		PubSub.unsubscribe("atualiza-lista-autores");
	}   	  

	render(){    
		return (
      <div>
        <div className="header">
          <h1>Cadastro de Autores</h1>
        </div>
        <div className="content" id="content">
          <FormularioAutor />
          <TabelaAutores lista={this.state.lista} />
        </div>
      </div>
    );
	}
}

