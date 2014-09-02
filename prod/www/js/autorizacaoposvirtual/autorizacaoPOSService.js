(function() {
    'use strict';
    angular
        .module('app')
        .factory('autorizacaoPOSService', autorizacaoPOSService);

    autorizacaoPOSService.$inject = ['$resource'];

    /**
     * @ngInject
     */
    function autorizacaoPOSService($resource) {
        var api_base_url = "http://172.29.24.26:8080/portal-emissor/rest";

        var service = {
            lista: lista,
            cancela: cancela,
            confirma: confirma
        };
        return service;

        function lista(cpf) {
            return $resource(api_base_url + '/autorizacao_pos_virtual/lista/:cpf', {
                    cpf: cpf
                }, {
                    query: {
                        //isArray: true,
                        method: 'GET',
                    },
                    update: {
                        method: 'PUT',
                        isArray: false
                    }
                }

            );
        };

        function confirma(filtro) {
            return $resource(api_base_url + '/autorizacao_pos_virtual/confirma/:oid', {
                    oid: filtro.oid //88957659003105,

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
                    },
                    save: {
                        //isArray: true,
                        method: 'POST',
                        headers: {
                            senha: filtro.senha
                        }
                        //withCredentials : true

                    }

                }

            );
        };

        function cancela(filtro) {
            return $resource(api_base_url + '/autorizacao_pos_virtual/cancela/:oid', {
                    oid: filtro.oid //88957659003105,



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
                    },
                    save: {
                        //isArray: true,
                        method: 'POST',
                        headers: {
                            senha: filtro.senha,
                            motivoCancelamento: filtro.motivoCancelamento
                        }
                        // headers: {Authorization: 'Basic dXNlcl9pdHM6ZGVzZW52'}
                        //withCredentials : true

                    }
                }

            );
        };



    }

})();