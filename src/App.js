import React, { Component } from 'react';
import './css/side-menu.css';
import './css/pure-min.css';
import CustomInputText from './componentes/CustomInputText'
import CustomSubmit from './componentes/CustomSubmit'
import $ from "jquery";

class App extends Component {

  constructor() {   
    super(); 
    this.state = {lista : [],nome: '', email: '', senha: ''};
    this.setNome = this.setNome.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setSenha = this.setSenha.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);    
  }  

  componentDidMount() {
    $.ajax({
      url: "http://localhost:8080/api/autor/lista",
      dataType: 'json',
      success: function(data) {
        this.setState({lista: data});
      }.bind(this)
    });
  }  

  setNome(e) {
    this.setState({nome: e.target.value});    
  }

  setEmail(e) {
    this.setState({email: e.target.value});
  }

  setSenha(e) {
    this.setState({senha: e.target.value});
  }  

  handleSubmit(e) {
    e.preventDefault();
    var nome = this.state.nome.trim();
    var email = this.state.email.trim();
    var senha = this.state.senha.trim();    

    $.ajax({
      url: "http://localhost:8080/api/autor",
      contentType: 'application/json',
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify({nome:nome,email:email,senha:senha}),
      success: function(data) {
        this.setState({lista:data});
      }.bind(this),
      error: function(response){
        if(response.status === 400){
          console.log("erro de validacao");
        }
      }
    });    
  }  

  render() {
    return (
        <div id="layout">            
            <a href="#menu" id="menuLink" className="menu-link">                
                <span></span>
            </a>

            <div id="menu">
                <div className="pure-menu">
                    <a className="pure-menu-heading" href="#">Company</a>

                    <ul className="pure-menu-list">
                        <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                        <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autores</a></li>
                        <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livros</a></li>
                    </ul>
                </div>
            </div>

          <div id="main">
            <div className="header">
              <h1>Cadastro de Autores</h1>
            </div>
            <div className="content" id="content">
              <div className="pure-form pure-form-aligned">
              <form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit}>
                <CustomInputText id="nome" name="nome" label="Nome: " type="text" value={this.state.nome} placeholder="Nome do Autor" onChange={this.setNome} />
                <CustomInputText id="email" name="email" label="Email: " type="text" value={this.state.email} placeholder="Email do Autor" onChange={this.setEmail} />
                <CustomInputText id="senha" name="senha" label="Senha: " type="password" value={this.state.senha} placeholder="Senha do Autor" onChange={this.setSenha}/>
                <CustomSubmit label="Enviar" />
              </form>

              </div>  
              <div>            
                <table className="pure-table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>email</th>
                    </tr>
                  </thead>
                  <tbody>
                      {
                        this.state.lista.map(function(autor){
                          return (
                              <tr key={autor.id}>
                                <td>{autor.nome}</td>                
                                <td>{autor.email}</td>                                              
                              </tr>
                          );
                        })}                    
                  </tbody>
                </table> 
              </div>             
            </div>
          </div>            


        </div>

    );
  }
}

export default App;
