import PubSub from 'pubsub-js';

export default class TratadorDeErros {
	publicaErros(objeto) {
		console.log(objeto);
		var erros = objeto.errors;
		for(var index in erros){				
			var erro = erros[index];				
			PubSub.publish("erro-validacao",erro);
		}		
	}
}