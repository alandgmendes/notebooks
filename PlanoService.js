import authHeader from './AuthHeaderService';

export default class PlanoService {

    constructor({ urlBase }) {
        this.urlBase = urlBase;
    }

    async PesquisarPlanoComVeiculosMarcasLP(veiculo) {

        let resource = "api/plano/Lp";
        let filtro = veiculo === "" ? "" : `?filtro=${veiculo}`;
        let url = this.urlBase + resource + filtro;
        return new Promise(resolve =>

            fetch(url, {
                method: 'GET',
                body: JSON.stringify(),
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
            }).then(function (response) {

                if (!response.ok) {
                    return false                    
                }
                if (response.ok) {
                    return response.json();
                }

            }).then(resolve)
                .catch(function (error) {
                    console.error('Erro ao retornar Planos.', error);
                })
        );
    }

    async CadastrarPlano(data) {

        let resource = `api/plano`;
        let url = this.urlBase + resource;

        return new Promise(resolve =>

            fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': authHeader() }
            }).then(function (response) {
                
                if (!response.ok) {
                    let retorno = response.json();
                    return retorno;
                }
                if (response.ok) {
                    return response.json();
                }

            }).then(resolve)
                .catch(function (error) {
                    console.error('Erro ao Salvar Plano.', error);
                })
        );
    }

    async PesquisarPlano(idPlano) {

        let resource = `api/plano/${idPlano}`;
        
        let url = this.urlBase + resource ;

        return new Promise(resolve =>
            fetch(url, {
                method: 'GET',
                body: JSON.stringify(),
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': authHeader() }
            }).then(function (response) {
                if (!response.ok) {
                    return false
                }
                if (response.ok) {     
                    return response.json();
                }
            }).then(resolve)
                .catch(function (error) {
                    console.error('Erro ao retornar Plano.', error);
                })
        );
    }

    async AtualizarPlano(idPlano,data) {        

        let resource = `api/plano/${idPlano}`;
        let url = this.urlBase + resource; 

        return new Promise(resolve =>            

            fetch(url, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json' , 'Authorization':  authHeader()  }
            }).then(function (response) {
                
                if (!response.ok) {
                    let retorno = response.json();
                    return retorno;
                }
                if (response.ok) {
                    return response.json();
                }

            }).then(resolve)
            .catch(function (error) {              
                console.error('Erro ao Atualizar Plano.', error);
            })            
        );       

       
    }

    async PesquisarPlanos(valueSearch) {

        let resource = `api/plano`;
        let filtro =  `?filtro=${valueSearch}` 

        let url = this.urlBase + resource + filtro;
         
        return new Promise(resolve =>
            fetch(url, {
                method: 'GET',
                body: JSON.stringify(),
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': authHeader() }
            }).then(function (response) {
                if (!response.ok) {
                    return false                    
                }
                if (response.ok) {                    
                    return response.json();
                }
            }).then(resolve)
                .catch(function (error) {
                    console.error('Erro ao retornar Planos.', error);
            })
        );
    }

    async InserirFotoParaPlano(data,idPlano) {        
        
        let resource = `api/plano/${idPlano}/foto`;
        let url = this.urlBase + resource;         

        return new Promise(resolve =>            

            fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json' , 'Authorization':  authHeader()  }
            }).then(function (response) {
                
                if (!response.ok) {                   
                    return false                    
                }            
                if (response.ok){                                      
                    return response.json();
                }
            }).then(resolve)
            .catch(function (error) {                         
                console.error('Erro ao Salvar Foto.', error);
            })            
        );              
    }   

};