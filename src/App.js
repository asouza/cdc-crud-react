import React, { Component } from 'react';
import './css/side-menu.css';
import './css/pure-min.css';
import Home from './Home'

class App extends Component {
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
            <Home/>
          </div>            
        </div>

    );
  }
}

export default App;
