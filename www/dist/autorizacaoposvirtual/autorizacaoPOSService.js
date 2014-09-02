/*! portal-emissor-mobile v1.0.0 | (c) 2014 edersonbuss |  */
(function () {
  'use strict';
  angular
    .module('app')
    .factory('autorizacaoPOSService', autorizacaoPOSService);

    // manually declaring is time wasting
  autorizacaoPOSService.$inject = ['$resource'];

/**
 * @ngInject
 */
  function autorizacaoPOSService ($resource) { 
        
     
    var api_base_url = "http://localhost:8080/portal-emissor/rest";

    var service = {
    		lista: lista,
    		cancela: cancela
    
    };
    return service;

    function lista (filtro) { 
        return $resource(api_base_url + '/autorizacao_pos_virtual/lista/:cpf', {
                     
        	cpf:filtro.cpf
                     

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

             );
    };

    function cancela (filtro) { 
      return $resource(api_base_url + '/autorizacao_pos_virtual/cancela/:oid', {
    	  oid:filtro.oid//88957659003105,
                    
                    

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

             );
    };
  
              
        
  }

})();
