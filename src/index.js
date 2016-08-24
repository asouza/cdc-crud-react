import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AutorBox from './Autor';
import './index.css';
import {Router, Route} from 'react-router'
import {browserHistory} from 'react-router'

ReactDOM.render((
	<Router history={browserHistory}>
    	<Route path="/" component={App}>

    	</Route>
    	<Route path="/autor" component={AutorBox}/>
    	<Route path="/livro"/>    	
    </Router>
), document.getElementById('root'));
