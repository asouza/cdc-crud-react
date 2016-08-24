import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AutorAdmin from './Autor';
import LivroAdmin from './Livro';
import Home from './Home';
import './index.css';
import {Router, Route,IndexRoute} from 'react-router'
import {browserHistory} from 'react-router'

ReactDOM.render((
	<Router history={browserHistory}>
    	<Route path="/" component={App}>
    		<IndexRoute component={Home}/>
	    	<Route path="/autor" component={AutorAdmin}/>
	    	<Route path="/livro" component={LivroAdmin}/>    	
    	</Route>
    </Router>
), document.getElementById('root'));
