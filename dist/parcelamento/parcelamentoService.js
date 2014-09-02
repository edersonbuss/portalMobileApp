/*! portal-emissor-mobile v1.0.0 | (c) 2014 edersonbuss |  */
(function () {
  'use strict';
  angular
    .module('app')
    .factory('parcelamentoService', parcelamentoService);

    // manually declaring is time wasting
parcelamentoService.$inject = ['$resource'];

/**
 * @ngInject
 */
  function parcelamentoService ($resource) { 
        
     
    var api_base_url = "http://localhost:8080/portal-emissor/rest";

    var service = {
    simulaParceladoEmissor: simulaParceladoEmissor,
    consultaPlanoParcelamento: consultaPlanoParcelamento
    
    };
    return service;

    function simulaParceladoEmissor (filtro) { 
        return $resource(api_base_url + '/parcelamento/simula', {
                     
                     cnpj:filtro.cnpj,//parcelamento.cnpj
                     dia_vencimento:filtro.dia_vencimento,//parcelamento.cnpj
                     valor:filtro.valor

                 }, {
                     query: {
                         //isArray: true,
                         method: 'GET',
                         //headers: {Authorization: 'Basic dXNlcl9pbnRlZ3JhY2FvX3ZvbHBhdG86ZGVzZW52'}
                        //withCredentials : true
               
                     },
                     update: {
                         method: 'PUT',
                         isArray: false
                     }
                 }

             )
    };

    function consultaPlanoParcelamento (filtro) { 
      return $resource(api_base_url + '/parcelamento/consulta_plano', {
    	             cnpj:filtro.cnpj,//88957659003105,
                     cpf:filtro.cpf,//10497725126,
                     valor_transacao:filtro.valor_transacao,//500,
                     valor_entrada:filtro.valor_entrada,//100,
                     tipo_transacao:filtro.tipo_transacao,//TP_TRANSACAO_PARC_SEM_JUROS,
                     numero_cartao:filtro.numero_cartao//1111222233334444
                    

                 }, {
                     query: {
                         //isArray: true,
                         method: 'GET'
                        // headers: {Authorization: 'Basic dXNlcl9pdHM6ZGVzZW52'}
                        //withCredentials : true
               
                     },
                     update: {
                         method: 'PUT',
                         isArray: false
                     }
                 }

             )
    };
  
              
        
  }

})();
